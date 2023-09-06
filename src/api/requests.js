import { BASE_URL } from '@env';


export const sendNewRequest = async (newRequest, token) => {

    const response = await fetch(`${BASE_URL}/api/requests/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ...newRequest
        }),
    });


    const res = await response.json();

    if (!response.ok) {
        throw new Error(res.msg);
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;

}


export const getRequestsBySenderId = async (sender_id, token) => {
    const response = await fetch(`${BASE_URL}/api/requests/find/bySenderId/${sender_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });


    const res = await response.json();

    if (!response.ok) {
        if (response.status == 404)
            return 404;
        throw new Error(res.msg);
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;
}

export const getRequestsByRecipientId = async (recipient_id, token) => {
    const response = await fetch(`${BASE_URL}/api/requests/find/byRecipientId/${recipient_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });


    const res = await response.json();

    if (!response.ok) {
        if (response.status == 404)
            return 404;
        throw new Error(res.msg);
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;
}