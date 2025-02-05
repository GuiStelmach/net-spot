async function fetchCoverageData(zipcode, number) {
    const selectedOperators = [];
    if (document.getElementById('tim').checked) selectedOperators.push('tim');
    if (document.getElementById('sky').checked) selectedOperators.push('sky');
    if (document.getElementById('unifique').checked) selectedOperators.push('unifique');
    if (document.getElementById('claro').checked) selectedOperators.push('claro');
    if (document.getElementById('vero-internet').checked) selectedOperators.push('vero internet');
    if (document.getElementById('oi').checked) selectedOperators.push('oi');

    const operators = selectedOperators.join('%2C');

    const url = `https://cep.melhorplano.net/api/v1/postcodes/coverage?timeout=20000&c=${operators}&number=${number}&postcode=${zipcode}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "accept": "*/*",
                "Referer": "https://melhorplano.net/"
            }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();

        const providersWithMinSpeed = Object.entries(data.postcodeRes.providers)
            .filter(([_, details]) => details.data.speed.min > 0)
            .map(([provider]) => provider.toUpperCase());

        return providersWithMinSpeed.length > 0 
            ? providersWithMinSpeed 
            : "Sem Viabilidade.";
    } catch (error) {
        console.error("Erro ao buscar dados de cobertura:", error);
        throw error;
    }
}