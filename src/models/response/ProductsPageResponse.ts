import {Product} from "../Product";

export interface ProductsPageResponse {
    productDTOList: Product[],
    countOfProducts: number,
}