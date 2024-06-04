import { AxiosResponse } from "axios";
import $api from "../http";
import OrderTemplate from "../models/OrderTemplate";
import OrdersResponse from "../models/response/OrdersResponse";
import { COUNT_OF_ORDERS_PER_PAGE, COUNT_OF_ORDER_ITEMS_PER_PAGE } from "../utils/Constants";
import OrderItemsResponse from "../models/response/OrderItemsResposne";

export default class OrderService {
    

    static async createOrder(order: OrderTemplate): Promise<void> {
        await $api.post("/cart/add/order", order)
    }
    
    static async getListOfOrders(pageNum: number): Promise<AxiosResponse<OrdersResponse>>{
        return await $api.get("/admin/get/orders", {params: {
            pageNum: pageNum,
            countPerPage: COUNT_OF_ORDERS_PER_PAGE,
        }})
    }

    static async getOrderItems(orderId: number, pageNum:number): Promise<AxiosResponse<OrderItemsResponse>>{
        return await $api.get("/user/orders/"+orderId+"/items", {params: {
            pageNum: pageNum,
            countPerPage: COUNT_OF_ORDER_ITEMS_PER_PAGE,
            orderId: orderId,
        }})
    }
}