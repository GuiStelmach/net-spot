import { themeToggle } from './themeToggle.js';
import { bulkProcessor } from './bulkProcessor.js';
import { tabsManager } from './tabsManager.js';
import { initFormValidation } from './formValidation.js';

document.addEventListener('DOMContentLoaded', () => {
    themeToggle.init();
    bulkProcessor.init();
    tabsManager.init();
    initFormValidation();
    console.log('Inicialização concluída');
});

