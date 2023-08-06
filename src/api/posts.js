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


//searches:

export const postSearch = async (query, token) => {
    console.log("Query:", query);
    let response;
    if (query.trim() == '') {
        response = await fetch(`${BASE_URL}/api/posts/allPosts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    }

    else {
        response = await fetch(`${BASE_URL}/api/posts/allPosts/searchByKeywords/${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    }

    if (!response.ok) {
        const text = await response.text(); // Get the response body as text
        if (response.status == 404)
            return 404;
        else
            throw new Error(`Network response was not ok. Status: ${response.status}, Body: ${text}`);
    }

    const data = await response.json();
    console.log("Raw data from API:", data); // Print out the raw data
    return data;
}

export const postSearchByCity = async (query, city, token) => {
    let response;
    if (query.trim() == '') {
        response = await fetch(`${BASE_URL}/api/posts/search/byLocation/${city}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    }
    else {
        response = await fetch(`${BASE_URL}/api/posts/search/byLocation/${city}/${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    }

    if (!response.ok) {
        const text = await response.text(); // Get the response body as text
        if (response.status == 404)
            return 404;
        else
            throw new Error(`Network response was not ok. Status: ${response.status}, Body: ${text}`);
    }

    const data = await response.json();
    console.log("Raw data from API:", data); // Print out the raw data
    return data;
}


export const postSearchByCategory = async (query, category, token) => {
    console.log("posts ===>>> query:", query, "category", category);
    let response;
    if (query.trim() == '') {
        response = await fetch(`${BASE_URL}/api/posts/search/byCategory/${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    }
    else {
        response = await fetch(`${BASE_URL}/api/posts/search/byCategory/${category}/${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    }

    if (!response.ok) {
        const text = await response.text(); // Get the response body as text
        if (response.status == 404)
            return 404;
        else
            throw new Error(`Network response was not ok. Status: ${response.status}, Body: ${text}`);
    }

    const data = await response.json();
    console.log("Raw data from API:", data); // Print out the raw data
    return data;
}

export const postSearchByDistance = async (query, distance, userCoordinates, token) => {
    let response;
    console.log("user coordinates ===>>>", userCoordinates)
    if (query.trim() == '') {
        response = await fetch(`${BASE_URL}/api/posts/search/byDistance/${distance}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userCoordinates: userCoordinates
            }),
        });
    }
    else {
        response = await fetch(`${BASE_URL}/api/posts/search/byDistance/${distance}/${query}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userCoordinates: userCoordinates
            }),
        });
    }
    if (!response.ok) {
        const text = await response.text(); // Get the response body as text
        if (response.status == 404)
            return 404;
        else
            throw new Error(`Network response was not ok. Status: ${response.status}, Body: ${text}`);
    }

    const data = await response.json();
    console.log("Raw data from API:", data); // Print out the raw data
    return data;
}