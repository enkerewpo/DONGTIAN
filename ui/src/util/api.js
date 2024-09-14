import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 50000,
});

export default api;