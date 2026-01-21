// Sistema de processamento em massa
const bulkProcessor = {
    data: [],
    results: [],
    isProcessing: false,
    initialized: false,

    init: function() {
        // Prevenir inicialização duplicada
        if (this.initialized) return;
        this.initialized = true;
        this.setupEventListeners();
    },

    setupEventListeners: function() {
        const uploadArea = document.getElementById('upload-area');
        const csvFile = document.getElementById('csv-file');
        const btnProcess = document.getElementById('btn-process');
        const btnDownloadCsv = document.getElementById('btn-download-csv');
        const btnDownloadJson = document.getElementById('btn-download-json');
        const btnNewProcess = document.getElementById('btn-new-process');

        // Verificar se os elementos existem antes de adicionar listeners
        if (!uploadArea || !csvFile || !btnProcess) {
            console.warn('Elementos do bulk processor não encontrados');
            return;
        }

        // Drag and drop
        uploadArea.addEventListener('click', () => {
            csvFile.click();
        });
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            this.handleFile(file);
        });

        csvFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFile(file);
            }
        });

        btnProcess.addEventListener('click', () => this.processFile());
        if (btnDownloadCsv) btnDownloadCsv.addEventListener('click', () => this.downloadCSV());
        if (btnDownloadJson) btnDownloadJson.addEventListener('click', () => this.downloadJSON());
        if (btnNewProcess) btnNewProcess.addEventListener('click', () => this.resetForm());
    },

    handleFile: function(file) {
        if (!file || (!file.name.endsWith('.csv') && !file.name.endsWith('.txt'))) {
            alertSystem.show('Por favor, selecione um arquivo CSV ou TXT válido.', 'warning');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.parseCSV(e.target.result);
                document.getElementById('btn-process').disabled = false;
                alertSystem.show(`${this.data.length} linhas carregadas com sucesso!`, 'success');
            } catch (error) {
                alertSystem.show('Erro ao processar o arquivo.', 'error');
                console.error(error);
            }
        };
        reader.readAsText(file);
    },

    parseCSV: function(csvText) {
        this.data = [];
        const lines = csvText.trim().split('\n').filter(line => line.trim() !== '');

        if (lines.length === 0) return;

        // Detectar separador (vírgula ou ponto-e-vírgula)
        const firstDataLine = lines[0];
        let separator = ',';
        if (firstDataLine.includes(';') && !firstDataLine.includes(',')) {
            separator = ';';
        }

        // Detectar se a primeira linha é um cabeçalho
        const firstLine = lines[0].toLowerCase();
        let startIndex = 0;
        if (firstLine.includes('cep') || firstLine.includes('número') || firstLine.includes('num')) {
            startIndex = 1;
        }

        for (let i = startIndex; i < lines.length; i++) {
            const parts = lines[i].split(separator).map(val => val.trim().replace(/\r/g, '')).filter(val => val !== '');
            
            // Aceitar primeira ou segunda coluna como CEP, e segunda ou primeira como número
            let cep = null;
            let num = null;

            if (parts.length >= 2) {
                // Tentar identificar CEP (8 dígitos) vs número
                if (/^\d{8}$/.test(parts[0])) {
                    cep = parts[0];
                    num = parts[1];
                } else if (/^\d{8}$/.test(parts[1])) {
                    cep = parts[1];
                    num = parts[0];
                } else {
                    // Se nenhum corresponde ao padrão de CEP, usar ordem padrão
                    cep = parts[0];
                    num = parts[1];
                }

                if (cep && num) {
                    this.data.push({ cep, num });
                }
            }
        }
    },

    processFile: async function() {
        if (this.isProcessing || this.data.length === 0) return;

        this.isProcessing = true;
        this.results = [];
        const loadingDiv = document.getElementById('loading');
        const loadingText = document.getElementById('loading-text');
        
        loadingDiv.style.visibility = 'visible';
        document.getElementById('bulk-results').style.display = 'none';
        document.getElementById('results-summary').style.display = 'none';

        let processed = 0;
        let withCoverage = 0;
        let withoutCoverage = 0;

        for (const item of this.data) {
            try {
                loadingText.textContent = `Processando ${processed + 1}/${this.data.length}...`;
                
                // Validar dados
                if (!validateZipcode(item.cep) || !validateNumber(item.num)) {
                    this.results.push({
                        cep: item.cep,
                        num: item.num,
                        status: 'erro',
                        providers: [],
                        error: 'Dados inválidos'
                    });
                    processed++;
                    continue;
                }

                const { address, providers } = await fetchCoverageData(item.cep, item.num);
                
                const result = {
                    cep: item.cep,
                    num: item.num,
                    address: `${address.street}, ${address.neighborhood}, ${address.city}`,
                    status: providers.length > 0 ? 'sucesso' : 'sem_cobertura',
                    providers: providers
                };

                this.results.push(result);

                if (providers.length > 0) {
                    withCoverage++;
                } else {
                    withoutCoverage++;
                }

            } catch (error) {
                this.results.push({
                    cep: item.cep,
                    num: item.num,
                    status: 'erro',
                    providers: [],
                    error: error.message || 'Erro ao consultar'
                });
                withoutCoverage++;
            }

            processed++;

            // Pequeno delay para não sobrecarregar a API
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        loadingDiv.style.visibility = 'hidden';
        this.displayResults(processed, withCoverage, withoutCoverage);
        this.isProcessing = false;
    },

    displayResults: function(processed, withCoverage, withoutCoverage) {
        // Ocultar área de upload
        document.getElementById('upload-area').style.display = 'none';
        
        // Mostrar resultados
        document.getElementById('bulk-results').style.display = 'block';
        document.getElementById('summary-processed').textContent = processed;
        document.getElementById('summary-with-coverage').textContent = withCoverage;
        document.getElementById('summary-without-coverage').textContent = withoutCoverage;
        // Resultados processados - dados disponíveis para download
    },

    downloadCSV: function() {
        let csv = 'CEP,Número,Operadora\n';

        for (const result of this.results) {
            // Se tem operadoras, criar uma linha para cada
            if (result.providers.length > 0) {
                for (const provider of result.providers) {
                    csv += `${result.cep},${result.num},${provider}\n`;
                }
            } else {
                // Se não tem operadora, deixar vazio
                csv += `${result.cep},${result.num},\n`;
            }
        }

        this.downloadFile(csv, 'net-spot-resultados.csv', 'text/csv');
    },

    downloadJSON: function() {
        const simplified = this.results.map(result => ({
            cep: result.cep,
            numero: result.num,
            operadoras: result.providers
        }));
        const json = JSON.stringify(simplified, null, 2);
        this.downloadFile(json, 'net-spot-resultados.json', 'application/json');
    },

    downloadFile: function(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    resetForm: function() {
        this.data = [];
        this.results = [];
        // Mostrar área de upload novamente
        document.getElementById('upload-area').style.display = 'block';
        document.getElementById('csv-file').value = '';
        document.getElementById('btn-process').disabled = true;
        document.getElementById('bulk-results').style.display = 'none';
        alertSystem.show('Formulário limpo. Carregue um novo arquivo.', 'info');
    }
};
