// Inicializador global para todos os módulos
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar tema
    if (typeof themeToggle !== 'undefined') {
        themeToggle.init();
    }

    // Inicializar bulk processor
    if (typeof bulkProcessor !== 'undefined') {
        bulkProcessor.init();
    }

    // Inicializar gerenciador de abas
    if (typeof tabsManager !== 'undefined') {
        tabsManager.init();
    }

    console.log('Inicialização concluída');
});
