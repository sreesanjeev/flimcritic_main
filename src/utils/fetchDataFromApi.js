import axios from 'axios';

const BASE_URL = `https://api.themoviedb.org/3`;
const TOKEN = process.env.REACT_APP_API_KEY;

const headers = {
    Authorization: `Bearer ${TOKEN}`
};

async function fetchDataFromApi(url, params = {}) {
    try {
        // Include the parameter in case it's recognized
        const fullParams = {
            ...params,
            include_adult: false
        };

        const { data } = await axios.get(BASE_URL + url, { headers, params: fullParams });

        // Filter out adult movies manually
        const filteredResults = data.results
            ? data.results.filter(movie => !movie.adult) // Filter out movies where `adult` is true
            : data;

        // Return the filtered results
        return { ...data, results: filteredResults };
    } catch (err) {
        return err;
    }
}

export default fetchDataFromApi;
