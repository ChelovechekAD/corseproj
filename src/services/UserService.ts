import {AxiosResponse} from 'axios';
import $api from '../http';
import { IUser } from '../models/IUser';
import UpdateUserRequest from '../models/request/UpdateUserRequest';

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/users');
    }

    static async updateUser(user: UpdateUserRequest): Promise<void> {
        await $api.post('/update_user', user);
    } 
}