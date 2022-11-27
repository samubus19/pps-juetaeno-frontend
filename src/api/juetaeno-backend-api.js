import axios from 'axios';

export const juetaenoApi = axios.create({
    //Configurar con ip donde está hosteado el backend
    baseURL : 'http://192.168.1.25:4000'
});