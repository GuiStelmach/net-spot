import { validateZipcode, validateNumber } from './validators.js';
import { getSelectedOperators } from './operatorSelection.js';
import { fetchCoverageData } from '../api/provider.js';
import { alertSystem } from './alertSystem.js';

export const bulkProcessor = {
    data: [],
    results: [],
    isProcessing: false,
    initialized: false,
    maxConcurrency: 3,

    init() {
        if (this.initialized) return;
        this.initialized = true;
        this.cacheElements();
        this.setupEventListeners();
    },

    cacheElements() {
        this.uploadArea = document.getElementById('upload-area');
        this.csvFile = document.getElementById('csv-file');
        this.btnProcess = document.getElementById('btn-process');
        this.btnDownloadCsv = document.getElementById('btn-download-csv');
        this.btnDownloadJson = document.getElementById('btn-download-json');
        this.btnNewProcess = document.getElementById('btn-new-process');
        this.btnBack = document.getElementById('btn-back');
        this.bulkResults = document.getElementById('bulk-results');
        this.resultsSummary = document.getElementById('results-summary');
        this.summaryProcessed = document.getElementById('summary-processed');
        this.summaryWithCoverage = document.getElementById('summary-with-coverage');
        this.summaryWithoutCoverage = document.getElementById('summary-without-coverage');
        this.loadingDiv = document.getElementById('loading');
        this.loadingText = document.getElementById('loading-text');
    },

    setupEventListeners() {
        if (!this.uploadArea || !this.csvFile || !this.btnProcess) {
            console.warn('Elementos do bulk processor não encontrados');
            return;
        }

        this.uploadArea.addEventListener('click', () => this.csvFile.click());

        this.uploadArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            this.uploadArea.classList.add('drag-over');
        });

        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('drag-over');
        });

        this.uploadArea.addEventListener('drop', (event) => {
            event.preventDefault();
            this.uploadArea.classList.remove('drag-over');
            const file = event.dataTransfer.files[0];
            this.handleFile(file);
        });

        this.csvFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                this.handleFile(file);
            }
        });

        this.btnProcess.addEventListener('click', () => this.processFile());

        if (this.btnDownloadCsv) {
            this.btnDownloadCsv.addEventListener('click', () => this.downloadCSV());
        }

        if (this.btnDownloadJson) {
            this.btnDownloadJson.addEventListener('click', () => this.downloadJSON());
        }

        if (this.btnNewProcess) {
            this.btnNewProcess.addEventListener('click', () => this.resetForm());
        }

        if (this.btnBack) {
            this.btnBack.addEventListener('click', () => window.history.back());
        }
    },

    handleFile(file) {
        if (!file || (!file.name.endsWith('.csv') && !file.name.endsWith('.txt'))) {
            alertSystem.show('Por favor, selecione um arquivo CSV ou TXT válido.', 'warning');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                this.parseCSV(event.target.result);
                this.btnProcess.disabled = this.data.length === 0;
                alertSystem.show(`${this.data.length} linhas carregadas com sucesso!`, 'success');
            } catch (error) {
                alertSystem.show('Erro ao processar o arquivo.', 'error');
                console.error(error);
            }
        };
        reader.readAsText(file);
    },

    parseCSV(csvText) {
        this.data = [];
        const lines = csvText.trim().split('\n').filter(line => line.trim() !== '');

        if (lines.length === 0) return;

        const firstLine = lines[0].toLowerCase();
        let startIndex = 0;
        if (firstLine.includes('cep') || firstLine.includes('número') || firstLine.includes('num')) {
            startIndex = 1;
        }

        const separator = lines[0].includes(';') && !lines[0].includes(',') ? ';' : ',';

        for (let i = startIndex; i < lines.length; i++) {
            const parts = lines[i]
                .split(separator)
                .map(value => value.trim().replace(/\r/g, ''))
                .filter(value => value !== '');

            if (parts.length < 2) continue;

            let cep = null;
            let num = null;

            if (/^\d{8}$/.test(parts[0])) {
                cep = parts[0];
                num = parts[1];
            } else if (/^\d{8}$/.test(parts[1])) {
                cep = parts[1];
                num = parts[0];
            } else {
                cep = parts[0];
                num = parts[1];
            }

            if (cep && num) {
                this.data.push({ cep, num });
            }
        }
    },

    async processFile() {
        if (this.isProcessing || this.data.length === 0) return;

        this.isProcessing = true;
        this.results = [];
        if (this.bulkResults) {
            this.bulkResults.style.display = 'none';
        }
        if (this.resultsSummary) {
            this.resultsSummary.style.display = 'none';
        }
        if (this.loadingDiv) {
            this.loadingDiv.style.visibility = 'visible';
        }

        let processed = 0;
        let withCoverage = 0;
        let withoutCoverage = 0;

        const operators = getSelectedOperators(document);
        const tasks = this.data.map((item, index) => async () => {
            if (this.loadingText) {
                this.loadingText.textContent = `Processando ${index + 1}/${this.data.length}...`;
            }

            if (!validateZipcode(item.cep) || !validateNumber(item.num)) {
                this.results.push({
                    cep: item.cep,
                    num: item.num,
                    status: 'erro',
                    providers: [],
                    error: 'Dados inválidos'
                });
                withoutCoverage++;
                processed++;
                return;
            }

            try {
                const { address, providers } = await fetchCoverageData(item.cep, item.num, operators);
                this.results.push({
                    cep: item.cep,
                    num: item.num,
                    address: address.street ? `${address.street}, ${address.neighborhood}, ${address.city}` : '',
                    status: providers.length > 0 ? 'sucesso' : 'sem_cobertura',
                    providers
                });

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
            await this.delay(200);
        });

        await this.runWithConcurrency(tasks, this.maxConcurrency);

        if (this.loadingDiv) {
            this.loadingDiv.style.visibility = 'hidden';
        }

        this.displayResults(processed, withCoverage, withoutCoverage);
        this.isProcessing = false;
    },

    async runWithConcurrency(tasks, limit) {
        const queue = [...tasks];
        const activePromises = [];

        while (queue.length > 0 || activePromises.length > 0) {
            while (queue.length > 0 && activePromises.length < limit) {
                const task = queue.shift();
                const promise = task().finally(() => {
                    const index = activePromises.indexOf(promise);
                    if (index !== -1) {
                        activePromises.splice(index, 1);
                    }
                });
                activePromises.push(promise);
            }
            if (activePromises.length > 0) {
                await Promise.race(activePromises);
            }
        }
    },

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    displayResults(processed, withCoverage, withoutCoverage) {
        if (this.uploadArea) {
            this.uploadArea.style.display = 'none';
        }

        if (this.bulkResults) {
            this.bulkResults.style.display = 'block';
        }

        if (this.resultsSummary) {
            this.resultsSummary.style.display = 'block';
        }

        if (this.summaryProcessed) {
            this.summaryProcessed.textContent = processed;
        }
        if (this.summaryWithCoverage) {
            this.summaryWithCoverage.textContent = withCoverage;
        }
        if (this.summaryWithoutCoverage) {
            this.summaryWithoutCoverage.textContent = withoutCoverage;
        }

        if (this.btnDownloadCsv) {
            this.btnDownloadCsv.disabled = false;
        }
        if (this.btnDownloadJson) {
            this.btnDownloadJson.disabled = false;
        }
        if (this.btnProcess) {
            this.btnProcess.disabled = true;
        }
    },

    downloadCSV() {
        let csv = 'CEP,Número,Operadora\n';

        for (const result of this.results) {
            if (result.providers.length > 0) {
                for (const provider of result.providers) {
                    csv += `${result.cep},${result.num},${provider}\n`;
                }
            } else {
                csv += `${result.cep},${result.num},\n`;
            }
        }

        this.downloadFile(csv, 'net-spot-resultados.csv', 'text/csv');
    },

    downloadJSON() {
        const simplified = this.results.map(result => ({
            cep: result.cep,
            numero: result.num,
            operadoras: result.providers
        }));
        const json = JSON.stringify(simplified, null, 2);
        this.downloadFile(json, 'net-spot-resultados.json', 'application/json');
    },

    downloadFile(content, filename, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    },

    resetForm() {
        this.data = [];
        this.results = [];

        if (this.uploadArea) {
            this.uploadArea.style.display = 'block';
        }
        if (this.csvFile) {
            this.csvFile.value = '';
        }
        if (this.btnProcess) {
            this.btnProcess.disabled = true;
        }
        if (this.bulkResults) {
            this.bulkResults.style.display = 'none';
        }
        if (this.resultsSummary) {
            this.resultsSummary.style.display = 'none';
        }
    }
};
