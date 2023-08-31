import axios from "axios";
const URL = (import.meta.env.VITE_WMURL) ? import.meta.env.VITE_WMURL : '';
const URL2 = (import.meta.env.VITE_WMURLL) ? import.meta.env.VITE_WMURLL : '';
const uname = (import.meta.env.VITE_BA_UNAME) ? import.meta.env.VITE_BA_UNAME : '';
const pass = (import.meta.env.VITE_BA_PASS) ? import.meta.env.VITE_BA_PASS : '';

export default axios.create({
    baseURL: URL2,
    auth: {
        username: uname,
        password: pass
    },
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: URL,
    auth: {
        username: uname,
        password: pass
    },
    withCredentials: true
});