import { makeAutoObservable } from "mobx";
import { Product } from "../models/Product";
import CartService from "../services/CartService";
import AddCartItemRequest from "../models/request/AddCartItemRequest";
import { store } from "../Context";
import { CartItem } from "../models/CartItem";
import DeleteCartItemRequest from "../models/request/DeleteCartItemRequest";
import OrderTemplate from "../models/OrderTemplate";
import OrderService from "../services/OrderService";
import OrderItem from "../models/OrderItem";

export default class OrderCartStore {
    items: CartItem[] = [];
    sumPrice: number = 0;
    userAddressPresent = false;
    cartOpen: boolean = false;

    setCartOpen(){
        this.cartOpen = !this.cartOpen;
    }

    setItems(newItems: CartItem[]) {
        this.items = newItems;
        this.setSumPrice();
    }

    getUserAddressPresent(){
        if (store.user.city != "" && store.user.building != "" && store.user.street != "") {
            this.setUserAddressPresent(true);
            return true;
        } else {
            console.log("user addr: " + store.user.city + " " + store.user.building + " " + store.user.street);
            this.setUserAddressPresent(false);
            return false;
        }
    }

    setUserAddressPresent(bool:boolean){
        this.userAddressPresent = bool;
    }

    setSumPrice(){
        let summa = 0;
        this.items.forEach((el: CartItem ) => summa += el.price*el.quantity);
        this.sumPrice = summa;
    }

    addItem(item: CartItem) {
    
        this.setItems([
            ...this.items,
            item
        ])
        
    }
    
    async saveItem(item: Product, count: number) {
        let isInArray = false;
        this.items.forEach(el =>{
            if (el.productId === item.id){
                isInArray = true;
            }
        })
        if (isInArray){
            return;
        }
        const req: AddCartItemRequest = {
            productId: item.id,
            userId: parseInt(store.user.id),
            quantity: count,
        }

        try{
            await CartService.addCartItem(req);
            const cartItem: CartItem = {
                productId: item.id,
                name: item.name,
                quantity: count,
                price: item.price,
                rating: item.rating,
                imageLink: item.imageLink,
            }
            this.addItem(cartItem);
        } catch (e){
            console.log(e)
        }
    }

    async deleteItem(id: number){
        const req: DeleteCartItemRequest = {
            userId: parseInt(store.user.id),
            productId: id,
        }
        try{
            await CartService.deleteCartItem(req);
            this.setItems(this.items.filter(el => el.productId !== id))
        } catch (e){
            console.log(e)
        }
        
    }   

    async getCart(userId: number){
        try{
            const items = await CartService.getAllCart(userId);
            if (items.data.cartItemDTOList.length !== 0){
                this.setItems(items.data.cartItemDTOList);
            }
        }catch(e){
            console.log(e)
        }
    }

    async createOrder(items: CartItem[]){

        const list: OrderItem[] = items.map(el=>{
            let out: OrderItem = {
                productId: el.productId,
                quantity: el.quantity,
                price: el.price * el.quantity,
            }
            return out;
        })
        const order: OrderTemplate = {
            userId: parseInt(store.user.id),
            orderItems: list,
        }
        try{
            await OrderService.createOrder(order);
            this.setItems([]);
        }catch(e){
            console.log(e);
        }
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }


}