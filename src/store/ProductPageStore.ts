import {makeAutoObservable} from "mobx";
import {Review} from "../models/Review";
import {Product} from "../models/Product";
import UserService from "../services/UserService";
import ProductPageService from "../services/ProductPageService";
import {COUNT_OF_ORDERS_PER_PAGE, COUNT_OF_PRODUCT_REVIEWS_PER_PAGE} from "../utils/Constants";

export default class ProductPageStore {

    private _product: Product | null = null;
    private _userReview: Review | null = null;
    private _reviews: Review[] | null = null;
    private _pageNum: number = 1;
    private _reviewCount: number = 0;
    private _maxCountOfReviewsPage: number = 1;
    private _newProduct : boolean = true;

    get product(): Product | null {
        return this._product;
    }

    set product(value: Product | null) {
        this._product = value;
    }

    get newProduct (): boolean {
        return this._newProduct;
    }

    set newProduct (value: boolean) {
        this._newProduct = value;
    }

    get userReview(): Review | null {
        return this._userReview;
    }

    set userReview(value: Review | null) {
        this._userReview = value;
    }

    get reviews(): Review[] | null {
        return this._reviews;
    }

    set reviews(value: Review[] | null) {
        this._reviews = value;
    }

    get pageNum(): number {
        return this._pageNum;
    }

    set pageNum(value: number) {
        this._pageNum = value;
        this.tryToFetchProductReviews()
    }

    get reviewCount(): number {
        return this._reviewCount;
    }

    set reviewCount(value: number) {
        this._reviewCount = value;
        this.maxCountOfReviewsPage = value;
    }

    get maxCountOfReviewsPage() {
        return this._maxCountOfReviewsPage;
    }

    set maxCountOfReviewsPage(value: number) {
        this._maxCountOfReviewsPage = Math.ceil(value / COUNT_OF_PRODUCT_REVIEWS_PER_PAGE);
    }

    async tryToFetchUserReview() {
        this.userReview = null;
        if (!this.product) {
            const message = "Product id cannot be null!"
            console.error(message)
            return
        }
        try {
            const reviewAxiosResponse = await UserService
                .getUserReviewOnProduct(this.product.id);
            this.userReview = reviewAxiosResponse.data;
            console.log("The user review has been successfully fetched.")
        } catch (error) {
            console.error("Fetching the user review ended with an error: " + error);
        }
    }

    async tryToFetchProductReviews() {
        this.reviews = null;
        this.reviewCount = 0;
        if (!this.product) {
            const message = "Product id cannot be null!"
            console.error(message)
            return
        }
        try {
            const reviewAxiosResponse = await ProductPageService
                .getProductReviews(this.product.id, this.pageNum);

            this.reviews = reviewAxiosResponse.data.reviewDTOList;
            this.reviewCount = reviewAxiosResponse.data.countOfReviews;
            console.log("The product reviews has been successfully fetched.")
        } catch (error) {
            console.error("Fetching the product reviews ended with an error: " + error);
        }
    }

    async tryToFetchProduct(productId: number | null) {
        if (!productId) {
            const message = "Product id cannot be null!"
            console.error(message)
            throw new Error(message)
        }
        try {
            const reviewAxiosResponse = await ProductPageService
                .getProductById(productId);
            return reviewAxiosResponse.data;
        } catch (error) {
            console.error("Fetching the product ended with an error: " + error);
            throw error;
        }
    }

    async tryToDeleteUserReview() {
        if (!this.product?.id) {
            const message = "Product id cannot be null!"
            console.error(message)
            throw new Error(message)
        }
        try {
            await UserService.deleteUserReviewOnProduct(this.product.id);
            this.userReview = null;
        } catch (error) {
            console.error("Deleting the user review ended with an error: " + error);
            throw error;
        }
    }


    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }


}