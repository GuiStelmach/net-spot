// Sistema global de alertas (fora do evento de submit)
const alertSystem = {
    alerts: [],

    show: function(message, type) {
        const alertId = Date.now();
        const alertElement = document.createElement('div');
        alertElement.className = `alert-box ${type}`;
        alertElement.id = `alert-${alertId}`;
        alertElement.style.animation = 'slideIn 0.3s ease';

        // Determinar o ícone conforme o tipo
        const iconClass = this.getIcon(type);

        alertElement.innerHTML = `
            <i class="${iconClass}"></i>
            <span>${message}</span>
        `;

        // Adicionar no topo da lista (novos alertas acima)
        const notificationContainer = document.querySelector('.notification');
        notificationContainer.insertBefore(alertElement, notificationContainer.firstChild);

        // Armazenar informações do alerta
        const alertData = {
            id: alertId,
            element: alertElement,
            timeout: setTimeout(() => {
                this.remove(alertId);
            }, 5000)
        };

        this.alerts.push(alertData);
    },

    remove: function(alertId) {
        const alertIndex = this.alerts.findIndex(a => a.id === alertId);

        if (alertIndex !== -1) {
            const alertData = this.alerts[alertIndex];

            // Animar saída
            alertData.element.style.animation = 'slideOut 0.3s ease';

            setTimeout(() => {
                if (alertData.element.parentNode) {
                    alertData.element.remove();
                }
                this.alerts.splice(alertIndex, 1);
            }, 300);
        }
    },

    getIcon: function(type) {
        switch (type) {
            case "success":
                return "fas fa-check-circle";
            case "info":
                return "fas fa-info-circle";
            case "warning":
                return "fas fa-exclamation-triangle";
            case "error":
                return "fas fa-times-circle";
            default:
                return "";
        }
    }
};

document.getElementById("coverage-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const zipcode = document.getElementById("zipcode").value.trim();
    const number = document.getElementById("number").value.trim();
    const resultDiv = document.getElementById("result");
    const loadingDiv = document.getElementById("loading");

    // Verifica se os campos estão preenchidos corretamente
    if (!validateZipcode(zipcode)) {
        alertSystem.show("CEP inválido! Digite apenas números, com no máximo 8 dígitos.", "warning");
        return;
    }

    if (!validateNumber(number)) {
        alertSystem.show("Número inválido! Digite apenas números.", "warning");
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
            alertSystem.show("Consulta realizada com sucesso! Provedores encontrados.", "success");
        } else {
            htmlContent += `<p style="color: red;">Sem Viabilidade.</p>`;
            alertSystem.show("Consulta realizada, mas sem viabilidade de provedores.", "info");
        }

        resultDiv.innerHTML = htmlContent;
    } catch (error) {
        alertSystem.show("Erro ao buscar os dados de cobertura.", "error");
        resultDiv.innerHTML = "<p style='color: red;'>Erro ao buscar os dados de cobertura.</p>";
    } finally {
        // Ocultar "Carregando..." independentemente do resultado
        loadingDiv.style.visibility = "hidden";
    }
});