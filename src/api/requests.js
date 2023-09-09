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


export const getRequestsBySenderId = async (sender_id, token, full = 'false') => {
    const response = await fetch(`${BASE_URL}/api/requests/find/bySenderId/${sender_id}/${full}`, {
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

export const getRequestsByRecipientId = async (recipient_id, token, full = 'false') => {
    const response = await fetch(`${BASE_URL}/api/requests/find/byRecipientId/${recipient_id}/${full}`, {
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


export const editRequest = async (requestId, token, fields) => {

    const response = await fetch(`${BASE_URL}/api/requests/edit/${requestId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            updatedData: {
                ...fields
            }
        }),
    });


    const res = await response.json();

    if (!response.ok) {
        throw new Error(res.msg);
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;

};


