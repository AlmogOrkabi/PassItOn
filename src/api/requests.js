import { BASE_URL } from '@env';
import { getToken } from '../utils/index';



export const sendNewRequest = async (newRequest) => {
    const token = await getToken();
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
        throw { ...res, status: response.status };
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;

}


export const getRequestsBySenderId = async (sender_id, full = 'false') => {
    const token = await getToken();
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
        else
            throw { ...res, status: response.status };
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;
}

export const getRequestsByRecipientId = async (recipient_id, full = 'false') => {
    const token = await getToken();
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
        else
            throw { ...res, status: response.status };
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;
}


export const getRequestBySenderAndPost = async (sender_id, post_id, full = 'false') => {
    const token = await getToken();
    const response = await fetch(`${BASE_URL}/api/requests/find/byPostAndSender/${post_id}/${sender_id}/${full}`, {
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
        else
            throw { ...res, status: response.status };
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;
}


export const editRequest = async (requestId, fields) => {
    const token = await getToken();

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
        throw { ...res, status: response.status };
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;

};

export const getRequests = async (queryParams = {}) => {

    const params = new URLSearchParams(queryParams);
    const token = await getToken();
    const response = await fetch(`${BASE_URL}/api/requests/search?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const res = await response.json();

    if (!response.ok) {
        // console.log("response: REQUESTS: " + response.status);
        // console.log("response: REQUESTS: " + Object.getPrototypeOf(res))
        // console.log("response: REQUESTS: " + JSON.stringify(res, null, 2))
        if (response.status == 404)
            return 404;
        else
            throw { ...res, status: response.status };
    }

    console.log("Raw data from API - REQUESTS : ", res); // Print out the raw data
    return res;

};
