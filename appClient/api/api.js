import axios from "axios";


const API = axios.create({
    baseURL: process.env.REST_API_URL,
    timeout: 5000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Language': 'es',
    },
});

export default API;