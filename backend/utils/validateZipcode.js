function validateZipcode(zipcode) {
    const zipcodeRegex = /^\d{1,8}$/; // Apenas números e no máximo 8 dígitos
    return zipcodeRegex.test(zipcode);
}
