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
    loadingDiv.style.visibility = "visible";

    try {
        const { address, providers } = await fetchCoverageData(zipcode, number);
        resultDiv.style.display = "block";

        // Sempre exibir o endereço
        let htmlContent = `
            <p style='font-size: 15px; margin-bottom: 10px;'><strong>Endereço:</strong> ${address.street}, ${address.neighborhood}, ${address.city} - ${address.state}</p>
        `;

        // Exibir provedores ou "Sem Viabilidade"
        if (providers.length > 0) {
            htmlContent += `<p>Provedores disponíveis: <strong>${providers.join(", ")}</strong></p>`;
        } else {
            htmlContent += `<p style="color: red;">Sem Viabilidade.</p>`;
        }

        resultDiv.innerHTML = htmlContent;
    } catch (error) {
        resultDiv.innerHTML = "<p style='color: red;'>Erro ao buscar os dados de cobertura.</p>";
    } finally {
        // Ocultar "Carregando..." independentemente do resultado
        loadingDiv.style.visibility = "hidden";
    }
});