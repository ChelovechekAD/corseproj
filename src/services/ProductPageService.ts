import {Product} from "../models/Product";
import {AxiosResponse} from "axios";
import $api from "../http";
import {Review} from "../models/Review";
import {COUNT_OF_PRODUCT_REVIEWS_PER_PAGE} from "../utils/Constants";
import {ProductReviewsResponse} from "../models/response/ProductReviewsResponse";

export default class ProductPageService {

    static async getProductById(productId: number): Promise<AxiosResponse<Product>> {
        return await $api.get(`/catalog/product/${productId}`)
    };

    static async getProductReviews(productId: number, pageNum: number): Promise<AxiosResponse<ProductReviewsResponse>> {
        return await $api.get(`/catalog/product/${productId}/reviews`, {
            params: {
                pageNum: pageNum,
                countPerPage: COUNT_OF_PRODUCT_REVIEWS_PER_PAGE,
            }
        })
    }
}