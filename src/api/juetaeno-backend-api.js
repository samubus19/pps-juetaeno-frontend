import axios from 'axios';

export const juetaenoApi = axios.create({
  //Configurar con ip donde está hosteado el backend
  baseURL: "http://localhost:4000",
});