import {AxiosResponse} from 'axios';
import $api from '../http';
import {IUser} from '../models/IUser';
import UpdateUserRequest from '../models/request/UpdateUserRequest';
import {CreateReviewRequest} from "../models/request/CreateReviewRequest";
import {Review} from "../models/Review";
import {COUNT_OF_ORDERS_PER_PAGE} from "../utils/Constants";
import OrdersResponse from "../models/response/OrdersResponse";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/admin/get/users');
    }

    static async updateUser(user: UpdateUserRequest): Promise<void> {
        await $api.put('/user/update', user);
    }

    static async getUserReviewOnProduct(productId: number): Promise<AxiosResponse<Review>> {
        return await $api.get(`/catalog/product/${productId}/reviews/user_review`)
    }

    static async deleteUserReviewOnProduct(productId: number): Promise<void> {
        return await $api.delete(`/catalog/product/${productId}/reviews/delete`)
    }

    static async createProductReviewOnProduct(productId: number, dto: CreateReviewRequest): Promise<void> {
        return await $api.post(`/catalog/product/${productId}/reviews/create`, dto)
    }

    static async getUserOrders(pageNum: number): Promise<AxiosResponse<OrdersResponse>> {
        return await $api.get(`/user/orders`, {
            params : {
                pageNum : pageNum,
                countPerPage: COUNT_OF_ORDERS_PER_PAGE
            }
        },)
    }
}