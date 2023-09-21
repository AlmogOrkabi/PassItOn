import { BASE_URL } from '@env';
import { uriToBase64 } from '../utils/index';
//import * as SecureStore from 'expo-secure-store';
import { setToken, getToken } from '../utils/index';


export const checkEmailAvailability = async (email) => {

    const response = await fetch(`${BASE_URL}/api/users/checkEmailAvailability/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });


    if (!response.ok) {
        if (response.status === 409)
            return 409
        else
            throw { ...res, status: response.status };
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
        //throw new Error(res.msg);
        //throw { ...res, status: response.status };
        throw { ...res, status: response.status };
    }
    await setToken(res.token);
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
        throw { ...res, status: response.status };

    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;

};

export const getUserById = async (_id) => {
    const token = await getToken();
    const response = await fetch(`${BASE_URL}/api/users/search/byId/${_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const res = await response.json();

    if (!response.ok) {
        throw { ...res, status: response.status };

    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;
}

export const getUsers = async (queryParams = {}) => {
    const params = new URLSearchParams(queryParams);
    const token = await getToken();
    const response = await fetch(`${BASE_URL}/api/users/search?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const res = await response.json();

    if (!response.ok) {
        if (response.status === 404)
            return 404;
        else
            throw { ...res, status: response.status };
    }

    console.log("Raw data from API - USERS : ", res); // Print out the raw data
    return res;
};


export const editUserData = async (userId, updatedData) => {
    console.log("Edit User Data: " + JSON.stringify(updatedData));
    const token = await getToken();
    const response = await fetch(`${BASE_URL}/api/users/edit/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({

            updatedData: { ...updatedData }
        }),
    });



    const res = await response.json();
    console.log("RESPONSE" + response.status)
    if (!response.ok) {
        throw { ...res, status: response.status };
    }

    console.log("Raw data from API - USERS : ", res); // Print out the raw data
    return res;
}