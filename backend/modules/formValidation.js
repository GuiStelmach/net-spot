import { validateZipcode, validateNumber } from './validators.js';
import { getSelectedOperators } from './operatorSelection.js';
import { fetchCoverageData } from '../api/provider.js';
import { alertSystem } from './alertSystem.js';

export function initFormValidation() {
    const coverageForm = document.getElementById('coverage-form');
    if (!coverageForm) return;

    coverageForm.addEventListener('submit', handleCoverageSubmit);
}

async function handleCoverageSubmit(event) {
    event.preventDefault();

    const zipcode = document.getElementById('zipcode')?.value.trim() ?? '';
    const number = document.getElementById('number')?.value.trim() ?? '';
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    if (!validateZipcode(zipcode)) {
        alertSystem.show('CEP inválido! Digite exatamente 8 dígitos numéricos.', 'warning');
        return;
    }

    if (!validateNumber(number)) {
        alertSystem.show('Número inválido! Digite apenas números.', 'warning');
        return;
    }

    const operators = getSelectedOperators(document);
    resultDiv.innerHTML = '';
    resultDiv.style.display = 'none';
    loadingDiv.style.visibility = 'visible';

    try {
        const { address, providers } = await fetchCoverageData(zipcode, number, operators);
        resultDiv.style.display = 'block';

        const addressHtml = address.street
            ? `<p class="result-address"><strong>Endereço:</strong> ${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}</p>`
            : '';

        const providersHtml = providers.length > 0
            ? `<p>Provedores disponíveis: <strong>${providers.join(', ')}</strong></p>`
            : `<p class="result-no-coverage">Sem Viabilidade.</p>`;

        resultDiv.innerHTML = `${addressHtml}${providersHtml}`;
        alertSystem.show(
            providers.length > 0
                ? 'Consulta realizada com sucesso! Provedores encontrados.'
                : 'Consulta realizada, mas sem viabilidade de provedores.',
            providers.length > 0 ? 'success' : 'info'
        );
    } catch (error) {
        alertSystem.show('Erro ao buscar os dados de cobertura.', 'error');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<p class="result-error">Erro ao buscar os dados de cobertura.</p>`;
        console.error(error);
    } finally {
        loadingDiv.style.visibility = 'hidden';
    }
}

