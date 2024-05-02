import axios from 'axios';
import { store } from '../Context';
import { IUser } from '../models/IUser';


export const API_URL = `http://localhost:8081/CourseProject_war_exploded/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    if (token != null){
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    let url: string = config.url ?? '';
    let command: string = url?.substring(url.lastIndexOf("/")+1);
    console.log("Command: " + command);
    config.headers["Command"] = command;
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
            const response = await axios.get(`${API_URL}/refresh`, {
                withCredentials: true,
                headers: {
                    'Command': 'refresh'
                }
            })
            localStorage.setItem('access-token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            store.setAuth(false);
            store.setUser({} as IUser);
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api;

