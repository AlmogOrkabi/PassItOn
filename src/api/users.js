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

    const res = await response.json();

    if (!response.ok) {
        throw new Error(res.msg);
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;
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

    const res = await response.json();

    if (!response.ok) {
        throw new Error(res.msg);
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;

};

