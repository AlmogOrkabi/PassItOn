import { BASE_URL } from '@env';

// export const login = async (email, password) => {
//     const response = await fetch(`${BASE_URL}/api/users/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             email,
//             password,
//         }),
//     });

//     if (!response.ok) {
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`Network response was not ok. Status: ${response.status}, Message: ${errorData.error}`);
//         }
//     }

//     const data = await response.toString();
//     console.log("Data from login function:", data)
//     return data;
// };

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

export const getUserAddress = async (address_id, token) => {
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