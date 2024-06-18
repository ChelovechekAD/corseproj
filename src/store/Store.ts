import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import RegistrationFormData from "../models/request/RegistrationFormData";
import LoginFormData from "../models/request/LoginFormData";
import {functionalStore, orderCartStore} from "../Context";
import UpdateUserRequest from "../models/request/UpdateUserRequest";
import UserService from "../services/UserService";

export default class Store {
    user = {} as IUser;
    isAuth = false;

    itLogin = true;

    errorOccurred = false;
    errorMessage = "";

    path = "";

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setPath(path: string) {
        this.path = path;
    }

    handleError() {
        this.errorOccurred = false;
    }

    setItLogin(bool: boolean) {
        this.itLogin = bool;
    }

    async login(formData: LoginFormData) {
        try {
            const response = await AuthService.login(formData);
            console.log(response)
            localStorage.setItem('access-token', response.data.accessToken);

            localStorage.setItem('user', JSON.stringify(response.data.userDTO))

            this.setAuth(true);
            console.log(response.data?.userDTO + " " + response.data.accessToken)
            this.setUser(response.data.userDTO);
        } catch (e: any) {
            this.checkException(e);
            console.log(e.response?.data);
        }
    }

    async registration(formData: RegistrationFormData) {
        this.errorOccurred = false;
        try {
            const response = await AuthService.registration(formData);
            console.log(response)
            this.setItLogin(true);
        } catch (e: any) {
            this.checkException(e);
            console.log(e.response?.data);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('access-token');
            localStorage.removeItem('user');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            this.checkException(e);
            console.log(e.response?.data);
        }
    }

    async checkAuth() {
        functionalStore.setLoading(true);
        try {
            const token: any = localStorage.getItem('access-token');
            if (token == null || localStorage.getItem('user') == null) {
                const response = await axios.post<AuthResponse>(`${API_URL}auth/refresh`, {}, {withCredentials: true})
                console.log(response);
                localStorage.setItem('access-token', response.data.accessToken);
                localStorage.setItem('user', JSON.stringify(response.data.userDTO))
            }
            const user: any = localStorage.getItem("user");
            if (user != null) {
                this.setUser(JSON.parse(user));
            }
            this.setAuth(true);
        } catch (e: any) {
            console.log(e.response?.data);
            this.setAuth(false);
            this.setUser({} as IUser);
        } finally {
            functionalStore.setLoading(false);
        }

        console.log(this.user.roles);
    }

    async updateUser(user: UpdateUserRequest, callback: any) {
        functionalStore.setLoading(true);
        try {
            await UserService.updateUser(user);
            if (user.building != "" && user.street != "" && user.city != "") {
                orderCartStore.setUserAddressPresent(true);
            }
            if (callback) {
                callback(false);
            }
            const newUser: IUser = {
                id: this.user.id,
                email: this.user.email,
                name: user.name,
                surname: user.surname,
                building: user.building,
                street: user.street,
                city: user.city,
                phoneNumber: this.user.phoneNumber,
                roles: this.user.roles,
            }
            this.setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
        } catch (e) {
            console.log(e);
        } finally {
            functionalStore.setLoading(false)
        }
    }

    checkException(e: any) {
        if (e.response?.status === 404) {
            console.error(e.response?.data);
            this.errorOccurred = true;
            this.errorMessage = e.response?.data.exceptionMessage;
            return
        }
        this.errorOccurred = true;
        this.errorMessage = e.response?.data;
    }
}