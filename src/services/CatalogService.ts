import { AxiosResponse } from "axios";
import { CategoriesResponse } from "../models/response/CategoriesResponse";
import $api from "../http";
import { ProductsPageResponse } from "../models/response/ProductsPageResponse";
import { COUNT_OF_PRODUCTS_PER_PAGE } from "../utils/Constants";

export default class CatalogService {
    static async getAllCategories(): Promise<AxiosResponse<CategoriesResponse>> {
        return await $api.get("/all_categories");
    }

    static async getAllProductsPage(pageNum: number): Promise<AxiosResponse<ProductsPageResponse>> {
        return await $api.get("/products_page", {params: {
            pageNum: pageNum,
            countPerPage: COUNT_OF_PRODUCTS_PER_PAGE
        }});
    }

    static async getAllCategoryProductsPage(pageNum: number, categoryId: number): Promise<AxiosResponse<ProductsPageResponse>> {
        return await $api.get("/category_products_page", {params: {
            pageNum: pageNum,
            countPerPage: COUNT_OF_PRODUCTS_PER_PAGE,
            categoryId: categoryId
        }});
    }
}