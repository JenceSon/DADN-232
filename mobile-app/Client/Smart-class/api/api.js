import axios from 'axios';
// import { ip } from './ip';
// const baseUrl = ip; //IP phong toi, ae dung dua cho hacker
const baseUrl = "http://10.43.131.207:3000"  // lay gia tri bien moi truong tu file env
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