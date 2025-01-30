document.getElementById("coverage-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const zipcode = document.getElementById("zipcode").value.trim();
    const number = document.getElementById("number").value.trim();
    const resultDiv = document.getElementById("result");
    const loadingDiv = document.getElementById("loading");

    if (!zipcode || !number) {
        resultDiv.innerHTML = "<p style='color: red;'>Por favor, preencha todos os campos.</p>";
        return;
    }

    // Exibir "Carregando..."
    resultDiv.innerHTML = "";
    loadingDiv.style.display = "block";

    try {
        const providers = await fetchCoverageData(zipcode, number);
        
        if (typeof providers === "string") {
            resultDiv.innerHTML = `<p style="color: red;">${providers}</p>`;
        } else {
            resultDiv.innerHTML = `<p>Provedores disponíveis: <strong>${providers.join(", ")}</strong></p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = "<p style='color: red;'>Erro ao buscar os dados de cobertura.</p>";
    } finally {
        // Ocultar "Carregando..." independentemente do resultado
        loadingDiv.style.display = "none";
    }
});

async function fetchCoverageData(zipcode, number) {
    const url = `https://cep.melhorplano.net/api/v1/postcodes/coverage?timeout=20000&c=tim%2Csky%2Cunifique%2Cclaro%2Cvero+internet&number=${number}&postcode=${zipcode}`;

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
            : "Sem Viabilidade TIM, SKY, Unifique, Claro ou Vero.";
    } catch (error) {
        console.error("Erro ao buscar dados de cobertura:", error);
        throw error;
    }
}