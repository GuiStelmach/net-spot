export const tabsManager = {
    init() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    },

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

        const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
        if (selectedButton) {
            selectedButton.classList.add('active');
        }

        const coverageForm = document.getElementById('coverage-form');
        const bulkForm = document.getElementById('bulk-form');

        if (tabName === 'simple' && coverageForm) {
            coverageForm.style.display = 'flex';
        }

        if (tabName === 'bulk' && bulkForm) {
            bulkForm.style.display = 'block';
        }

        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.style.display = 'none';
        }

        const bulkResults = document.getElementById('bulk-results');
        if (bulkResults) {
            bulkResults.style.display = 'none';
        }

        const summary = document.getElementById('results-summary');
        if (summary) {
            summary.style.display = 'none';
        }
    }
};

