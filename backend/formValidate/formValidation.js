document.getElementById("coverage-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const zipcode = document.getElementById("zipcode").value.trim();
    const number = document.getElementById("number").value.trim();
    const resultDiv = document.getElementById("result");
    const loadingDiv = document.getElementById("loading");

    // Função para exibir alertas com ícones
    function showAlert(message, type) {
        const alertBox = document.getElementById("alert-box");
        const alertMessage = document.getElementById("alert-message");
        const icon = alertBox.querySelector("i");

        alertBox.classList.remove("success", "info", "warning", "error");
        alertBox.classList.add(type);

        alertMessage.textContent = message;

        // Definir o ícone conforme o tipo de alerta
        switch (type) {
            case "success":
                icon.className = "fas fa-check-circle"; // Ícone de sucesso
                break;
            case "info":
                icon.className = "fas fa-info-circle"; // Ícone de informação
                break;
            case "warning":
                icon.className = "fas fa-exclamation-triangle"; // Ícone de aviso
                break;
            case "error":
                icon.className = "fas fa-times-circle"; // Ícone de erro
                break;
            default:
                icon.className = ""; // Remover ícone, se necessário
        }

        alertBox.classList.add("show");

        setTimeout(() => {
            alertBox.classList.remove("show");
        }, 5000);
    }

    // Verifica se os campos estão preenchidos corretamente
    if (!validateZipcode(zipcode)) {
        showAlert("CEP inválido! Digite apenas números, com no máximo 8 dígitos.", "warning");
        return;
    }

    if (!validateNumber(number)) {
        showAlert("Número inválido! Digite apenas números.", "warning");
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
            showAlert("Consulta realizada com sucesso! Provedores encontrados.", "success");
        } else {
            htmlContent += `<p style="color: red;">Sem Viabilidade.</p>`;
            showAlert("Consulta realizada, mas sem viabilidade de provedores.", "info");
        }

        resultDiv.innerHTML = htmlContent;
    } catch (error) {
        showAlert("Erro ao buscar os dados de cobertura.", "error");
        resultDiv.innerHTML = "<p style='color: red;'>Erro ao buscar os dados de cobertura.</p>";
    } finally {
        // Ocultar "Carregando..." independentemente do resultado
        loadingDiv.style.visibility = "hidden";
    }
});