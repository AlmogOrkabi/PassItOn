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
        throw { ...res, status: response.status };
    }

    console.log("Raw data from API:", res); // Print out the raw data
    return res;

};


export const getReportByOwnerId = async (owner_id, token, full = 'false') => {

    const response = await fetch(`${BASE_URL}/api/reports/search/byOwnerId/${owner_id}/${full}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    const res = await response.json();

    if (!response.ok) {
        throw { ...res, status: response.status };
    }

    console.log("Raw data from API - REPORTS:", res); // Print out the raw data
    return res;

};

export const getReports = async (queryParams = {}, token) => {


    const params = new URLSearchParams(queryParams);


    const response = await fetch(`${BASE_URL}/api/reports/search?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const res = await response.json();

    if (!response.ok) {
        if (response.status == 404)
            return 404;
        else
            throw { ...res, status: response.status };
    }

    console.log("Raw data from API - REPORTS:", res); // Print out the raw data
    return res;
};