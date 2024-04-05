import axios from 'axios';
import 'dotenv/config'
// import { ip } from './ip';
// const baseUrl = ip;
const baseUrl = process.env.IPSV
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