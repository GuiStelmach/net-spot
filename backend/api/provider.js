import { fetchCoverageData as fetchCoverageDataFromApi } from './apiClient.js';

export async function fetchCoverageData(zipcode, number, operators = []) {
    const data = await fetchCoverageDataFromApi({ zipcode, number, operators });
    const address = data.postcodeRes?.postcode || {};

    const providers = Object.entries(data.postcodeRes?.providers || {})
        .filter(([, details]) => details.data?.speed?.min > 0)
        .map(([provider]) => provider.toUpperCase());

    return {
        address,
        providers
    };
}
