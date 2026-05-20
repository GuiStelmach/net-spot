const API_BASE_URL = 'https://cep.melhorplano.net/api/v1/postcodes/coverage';

const DEFAULT_HEADERS = {
    accept: '*/*',
    Referer: 'https://melhorplano.net/'
};

export async function fetchCoverageData({ zipcode, number, operators }) {
    const operatorList = operators && operators.length > 0
        ? encodeURIComponent(operators.join(','))
        : 'tim%2Csky%2Cunifique%2Cclaro%2Cvero+internet%2Cvivo%2Coi';

    const url = `${API_BASE_URL}?timeout=20000&c=${operatorList}&number=${encodeURIComponent(number)}&postcode=${encodeURIComponent(zipcode)}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: DEFAULT_HEADERS
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}
