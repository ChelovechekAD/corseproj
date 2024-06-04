import {makeAutoObservable} from "mobx";

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