import axios from 'axios';
import { store } from '../Context';
import { IUser } from '../models/IUser';


export const API_URL = `http://localhost:8080/api/v1/`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    if (token != null){
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log("Request body: " + config.data);
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post(`${API_URL}auth/refresh`, {},{
                withCredentials: true,
            })
            localStorage.setItem('access-token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            store.setAuth(false);
            store.setUser({} as IUser);
            localStorage.removeItem('access-token');
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api;

