import { BASE_URL } from '@env';
import { uriToBase64 } from '../utils/index';

export const checkEmailAvailability = async (email) => {
    const response = await fetch(`${BASE_URL}/api/users/checkEmailAvailability/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

        },
    });

    if (!response.ok) {
        throw new Error(response.status)
    }
    else
        return true;

};

export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        const text = await response.text(); // Get the response body as text
        throw new Error(`Network response was not ok. Status: ${response.status}, Body: ${text}`);
    }

    const data = await response.json();
    console.log("Raw data from API:", data); // Print out the raw data
    return data;
};


export const registerNewUser = async (user) => {
    console.log("resister user:", user);
    const response = await fetch(`${BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...user
        }),
    });

    if (!response.ok) {
        const text = await response.json(); // Get the response body as text
        //throw new Error(`Network response was not ok. Status: ${response.status}, Body: ${text}`);
        throw new Error(text.msg);
    }

    const data = await response.json();
    console.log("Raw data from API:", data); // Print out the raw data
    return data;

};

