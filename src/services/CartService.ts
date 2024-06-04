import {AxiosResponse} from "axios";
import $api from "../http";
import AddCartItemRequest from "../models/request/AddCartItemRequest";
import CartItemsResponse from "../models/response/CartItemsResponse";
import DeleteCartItemRequest from "../models/request/DeleteCartItemRequest";

export default class CartService {

    static async addCartItem(cartItem: AddCartItemRequest): Promise<void> {
        await $api.post('/cart/add/item', cartItem)
    }

    static async deleteCartItem(cartItem: DeleteCartItemRequest): Promise<void> {
        await $api.delete('/cart/delete/item', {params: {productId: cartItem.productId}});
    }

    static async getAllCart(): Promise<AxiosResponse<CartItemsResponse>> {
        return await $api.get('/cart/')
    }

}