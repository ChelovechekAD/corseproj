import Item from "../../components/Item";
import { Product } from "../Product";

export interface ProductsPageResponse{
    productDTOList: Product[],
    countOfProducts: number,
}