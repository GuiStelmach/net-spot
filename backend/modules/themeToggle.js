export const themeToggle = {
    init() {
        this.loadTheme();
        this.setupEventListeners();
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.applyTheme(theme);
    },

    setupEventListeners() {
        const toggleButton = document.getElementById('theme-toggle');
        if (!toggleButton) return;

        toggleButton.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            this.applyTheme(isDarkMode ? 'light' : 'dark');
        });
    },

    applyTheme(theme) {
        const toggleButton = document.getElementById('theme-toggle');
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (toggleButton) {
                toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
            }
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            if (toggleButton) {
                toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
            }
            localStorage.setItem('theme', 'light');
        }
    }
};

