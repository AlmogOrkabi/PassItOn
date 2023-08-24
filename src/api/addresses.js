import { BASE_URL } from '@env';

export const addNewAddress = async (address) => {
    //console.log("ADDRESS 1==>>", address)
    const response = await fetch(`${BASE_URL}/api/addresses/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            ...address
        }),
    });

    if (!response.ok) {
        const text = await response.text(); // Get the response body as text
        //throw new Error(`Network response was not ok. Status: ${response.status}, Body: ${text}`);
        return response;
    }

    const data = await response.json();
    console.log("Raw data from API:", data); // Print out the raw data
    return data;
}



export const getAddress = async (address_id, token) => {
    const response = await fetch(`${BASE_URL}/api/addresses/search/byId/${address_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        const text = await response.text(); // Get the response body as text
        throw new Error(`Network response was not ok. Status: ${response.status}, Body: ${text}`);
    }

    const data = await response.json();
    console.log("Raw data from API:", data); // Print out the raw data
    return data;
};