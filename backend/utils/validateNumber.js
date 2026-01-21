function validateNumber(number) {
    const numberRegex = /^\d+$/; // Apenas números
    return numberRegex.test(number);
}
