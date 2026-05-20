export const alertSystem = {
    alerts: [],

    show(message, type) {
        const alertId = Date.now();
        const alertElement = document.createElement('div');
        alertElement.className = `alert-box ${type}`;
        alertElement.id = `alert-${alertId}`;
        alertElement.style.animation = 'slideIn 0.3s ease';

        const iconClass = this.getIcon(type);
        alertElement.innerHTML = `
            <i class="${iconClass}"></i>
            <span>${message}</span>
        `;

        const notificationContainer = document.querySelector('.notification');
        if (notificationContainer) {
            notificationContainer.insertBefore(alertElement, notificationContainer.firstChild);
        }

        const alertData = {
            id: alertId,
            element: alertElement,
            timeout: setTimeout(() => {
                this.remove(alertId);
            }, 5000)
        };

        this.alerts.push(alertData);
    },

    remove(alertId) {
        const alertIndex = this.alerts.findIndex(a => a.id === alertId);

        if (alertIndex !== -1) {
            const alertData = this.alerts[alertIndex];
            alertData.element.style.animation = 'slideOut 0.3s ease';

            setTimeout(() => {
                if (alertData.element.parentNode) {
                    alertData.element.remove();
                }
                this.alerts.splice(alertIndex, 1);
            }, 300);
        }
    },

    getIcon(type) {
        switch (type) {
            case 'success':
                return 'fas fa-check-circle';
            case 'info':
                return 'fas fa-info-circle';
            case 'warning':
                return 'fas fa-exclamation-triangle';
            case 'error':
                return 'fas fa-times-circle';
            default:
                return 'fas fa-info-circle';
        }
    }
};
