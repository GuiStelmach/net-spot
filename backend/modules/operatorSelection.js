const OPERATOR_NAME_MAP = {
    tim: 'tim',
    sky: 'sky',
    unifique: 'unifique',
    claro: 'claro',
    'vero-internet': 'vero internet',
    oi: 'oi'
};

export function getSelectedOperators(container = document) {
    const checkboxes = Array.from(container.querySelectorAll('input[type="checkbox"][name]'));
    return checkboxes
        .filter(input => input.checked)
        .map(input => OPERATOR_NAME_MAP[input.name] || input.name)
        .filter(Boolean);
}
