/** @format */

export default async function sendRequest(
    url: string,
    params: string,
    formData?: FormData,
) {
    try {
        const fetchUrl = `${url}?${params}`;
        const fetchOptions: RequestInit = {};

        if (formData) {
            fetchOptions.method = 'POST';
            fetchOptions.body = formData;
        }

        const response = await fetch(fetchUrl, fetchOptions);

        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.status);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(`Request error: ${error}`);
    }
}
