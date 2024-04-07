import axios from 'axios';

const baseUrl = "http://192.168.0.107:3000/"

const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});
export const formRequest = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
})

export default api;