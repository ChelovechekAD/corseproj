import {AxiosResponse} from "axios";
import {CategoriesResponse} from "../models/response/CategoriesResponse";
import $api from "../http";
import {ProductsPageResponse} from "../models/response/ProductsPageResponse";
import {COUNT_OF_PRODUCTS_PER_PAGE} from "../utils/Constants";

export default class CatalogService {
    static async getAllCategories(): Promise<AxiosResponse<CategoriesResponse>> {
        return await $api.get("/catalog/categories");
    }

    static async getAllProductsPage(pageNum: number, categoryId: number | null): Promise<AxiosResponse<ProductsPageResponse>> {
        let categoryFilter: string | null = null;

        if (categoryId !== null && categoryId !== 0) {
            categoryFilter = "category=" + categoryId;
        }
        return await $api.get("/catalog/products", {
            params: {
                pageNum: pageNum,
                countPerPage: COUNT_OF_PRODUCTS_PER_PAGE,
                categoryFilter: categoryFilter
            }
        });
    }

    static async addNewCategory(name: string): Promise<void> {
        await $api.post(`/admin/add/category`, {
            categoryName: name
        })
    }

}