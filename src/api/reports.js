import { BASE_URL } from '@env';

export const addNewReport = async (report, token) => {

    const response = await fetch(`${BASE_URL}/api/reports/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ...report
        }),
    })

    const res = await response.json();

    if (!response.ok) {
        throw new Error(res.msg);
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;

};


export const getReportByOwnerId = async (owner_id, token) => {

    const response = await fetch(`${BASE_URL}/api/reports/search/byOwnerId/${owner_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    const res = await response.json();

    if (!response.ok) {
        throw new Error(res.msg);
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;

};
