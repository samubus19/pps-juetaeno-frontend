import axios from 'axios';

export const juetaenoApi = axios.create({
    baseURL : 'http://localhost:4000'
});