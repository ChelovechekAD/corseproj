import { AxiosResponse } from "axios";
import $api from "../http";
import AddCartItemRequest from "../models/request/AddCartItemRequest";
import CartItemsResponse from "../models/response/CartItemsResponse";
import DeleteCartItemRequest from "../models/request/DeleteCartItemRequest";

export default class CartService {

    static async addCartItem(cartItem: AddCartItemRequest): Promise<void> {
        await $api.post('/add_cart_item', cartItem)
    }

    static async deleteCartItem(cartItem: DeleteCartItemRequest): Promise<void> {
        await $api.post('/delete_cart_item', cartItem)
    }

    static async getAllCart(userId: number): Promise<AxiosResponse<CartItemsResponse>> {
        return await $api.get('/get_cart_items', {params: {userId: userId}})
    } 

}