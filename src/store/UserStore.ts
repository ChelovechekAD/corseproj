import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios, {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import RegistrationFormData from "../models/request/RegistrationFormData";
import LoginFormData from "../models/request/LoginFormData";
import {functionalStore, orderCartStore} from "../Context";
import UpdateUserRequest from "../models/request/UpdateUserRequest";
import UserService from "../services/UserService";
import OrderPreview from "../models/OrderPreview";
import {COUNT_OF_ORDERS_PER_PAGE} from "../utils/Constants";
import userOrders from "../pages/UserPages/UserOrders";
import OrderService from "../services/OrderService";
import OrderItemsResponse from "../models/response/OrderItemsResposne";

export default class UserStore {

    private _userOrders: OrderPreview[] | null = null;
    private _countOfOrders: number = 0;
    private _pageNum: number = 1;
    private _maxCountOfPages: number = 0;


    get pageNum(): number {
        return this._pageNum;
    }

    set pageNum(pageNum: number) {
        if (pageNum <= 0) {
            this._pageNum = 0;
        }else {
            this._pageNum = pageNum;
        }
    }

    get userOrders(): OrderPreview[] | null{
        return this._userOrders;
    }

    set userOrders(userOrders: OrderPreview[] | null) {
        this._userOrders = userOrders;
    }

    get countOfOrders() {
        return this._countOfOrders;
    }

    set countOfOrders(countOfOrders: number ) {
        this._countOfOrders = countOfOrders;
        if (countOfOrders == 0) {
            this.maxCountOfPages = 0;
        }else {
            this.maxCountOfPages = Math.ceil(this.countOfOrders / COUNT_OF_ORDERS_PER_PAGE);
        }
    }

    get maxCountOfPages() {
        return this._maxCountOfPages;
    }

    set maxCountOfPages(countOfPages: number) {
        this._maxCountOfPages = countOfPages;
    }

    async tryToFetchUserOrders(): Promise<void> {
        try {
            const response = await UserService.getUserOrders(this.pageNum);
            this.countOfOrders = response.data.count;
            this.userOrders = response.data.orderList;
        }catch(error) {
            console.error(error);
        }
    }

    async tryToGetOrderItems(pageNum: number, orderId:number): Promise<AxiosResponse<OrderItemsResponse>> {
        return await OrderService.getOrderItems(orderId, pageNum);
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }


}