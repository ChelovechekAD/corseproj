import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import RegistrationFormData from "../models/request/RegistrationFormData";
import LoginFormData from "../models/request/LoginFormData";

export default class AuthService {
    static async login(loginRequest: LoginFormData): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/auth/login', loginRequest);
    }

    static async registration(registrationRequest: RegistrationFormData): Promise<void> {
        await $api.post('/auth/registration', registrationRequest);
    }

    static async logout(): Promise<void> {
        await $api.post('/auth/logout');
    }
}