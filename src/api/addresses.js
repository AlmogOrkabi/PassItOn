import { BASE_URL } from '@env';

export const addNewAddress = async (address) => {
    const response = await fetch(`${BASE_URL}/api/addresses/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            ...address
        }),
    });

    const res = await response.json();

    if (!response.ok) {
        throw { ...res, status: response.status };
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;
}



export const getAddress = async (address_id, token) => {
    const response = await fetch(`${BASE_URL}/api/addresses/search/byId/${address_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    const res = await response.json();

    if (!response.ok) {
        if (response.status === 404)
            return 404;
        else
            throw { ...res, status: response.status };
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;
};