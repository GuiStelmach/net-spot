// Sistema de alternância de tema (Light/Dark mode)
const themeToggle = {
    init: function() {
        this.loadTheme();
        this.setupEventListeners();
    },

    loadTheme: function() {
        // Verifica se há uma preferência salva no localStorage
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Define o tema: salvo > preferência do sistema > light (padrão)
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        this.applyTheme(theme);
    },

    setupEventListeners: function() {
        const toggleButton = document.getElementById('theme-toggle');
        
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                const isDarkMode = document.body.classList.contains('dark-mode');
                this.applyTheme(isDarkMode ? 'light' : 'dark');
            });
        }
    },

    applyTheme: function(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    }
};
