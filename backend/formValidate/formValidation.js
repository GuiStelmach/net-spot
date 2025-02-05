document.getElementById("coverage-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const zipcode = document.getElementById("zipcode").value.trim();
    const number = document.getElementById("number").value.trim();
    const resultDiv = document.getElementById("result");
    const loadingDiv = document.getElementById("loading");

    // Verifica se os campos estão preenchidos corretamente
    if (!validateZipcode(zipcode)) {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "<p style='color: red;'>CEP inválido! Digite apenas números, com no máximo 8 dígitos.</p>";
        return;
    }

    if (!validateNumber(number)) {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "<p style='color: red;'>Número inválido! Digite apenas números.</p>";
        return;
    }

    // Exibir "Carregando..."
    resultDiv.innerHTML = "";
    loadingDiv.style.display = "block";

    try {
        const providers = await fetchCoverageData(zipcode, number);
        resultDiv.style.display = "block";

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