export function validateZipcode(zipcode) {
    return /^\d{8}$/.test(zipcode);
}

export function validateNumber(number) {
    return /^\d+$/.test(number);
}
