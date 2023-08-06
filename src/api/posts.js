import { BASE_URL } from '@env';
import { uriToBase64 } from '../utils/index';



export const addNewPost = async (post, token) => {
    console.log("USER TOKEN: " + token)
    const response = await fetch(`${BASE_URL}/api/posts/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ...post
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
