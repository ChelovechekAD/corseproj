import { makeAutoObservable } from "mobx";
import OrderPreview from "../models/OrderPreview";
import OrderService from "../services/OrderService";
import { COUNT_OF_ORDERS_PER_PAGE, COUNT_OF_ORDER_ITEMS_PER_PAGE } from "../utils/Constants";
import OrderItemInfo from "../models/OrderItemInfo";
import {Product} from "../models/Product";
import {Review} from "../models/Review";

export default class ProductPageStore {


    /*private _product: Product = {

    };
    private _userReview: Review | null = null;

    get product(): Product {
        return this._product;
    }

    set product(value: Product) {
        this._product = value;
    }

*/

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }


}