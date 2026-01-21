// Gerenciador de abas para efeito SPA
const tabsManager = {
    init: function() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    },

    switchTab: function(tabName) {
        // Remover classe active de todos os botões
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Remover classe active de todos os conteúdos
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });

        // Adicionar classe active ao botão clicado
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Mostrar o conteúdo correspondente
        if (tabName === 'simple') {
            document.getElementById('coverage-form').style.display = 'flex';
        } else if (tabName === 'bulk') {
            document.getElementById('bulk-form').style.display = 'block';
        }

        // Limpar resultados quando mudar de aba
        document.getElementById('result').style.display = 'none';
        document.getElementById('bulk-results').style.display = 'none';
        document.getElementById('results-summary').style.display = 'none';
    }
};
