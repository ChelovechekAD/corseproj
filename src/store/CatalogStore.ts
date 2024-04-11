import { makeAutoObservable } from "mobx";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import CatalogService from "../services/CatalogService";
import { COUNT_OF_PRODUCTS_PER_PAGE } from "../utils/Constants";

export default class CatalogStore {
    products: Product[] = [];
    categories: Category[] = [];
    totalCountProducts = 0;
    selectedCategory = 0;
    curPage = 1;
    countPages = 0;

    setCountPages(){
        this.countPages = Math.ceil(this.totalCountProducts / COUNT_OF_PRODUCTS_PER_PAGE)
    }
    setCurPage(page: number){
        this.curPage = page;
        this.getAllProductsPage(page);
    }
    setCategory(categoryList: Category[]){
        this.categories = categoryList;
    }

    setItems(productList: Product[]){
        this.products = productList;
    }
    selectCategory(categoryId: number){
        if (this.selectedCategory !== categoryId){
            this.selectedCategory = categoryId;
            this.setCurPage(1);
        }
    }

    setTotalCount(count: number){
        this.totalCountProducts = count;
        this.setCountPages();
    }

    async getAllCategories(){
        try {

            const categoriesResponse = await CatalogService.getAllCategories();
            this.setCategory(categoriesResponse.data.categoryDTOList);

        } catch (e){
            console.log(e);
        }
    }

    async getAllProductsPage(pageNum: number){
        try {

            let productsResponse;
            this.selectedCategory === 0 ?  
                productsResponse = await CatalogService.getAllProductsPage(pageNum) :
                productsResponse = await CatalogService.getAllCategoryProductsPage(pageNum, this.selectedCategory);
            this.setItems(productsResponse.data.productDTOList);
            this.setTotalCount(productsResponse.data.countOfProducts);
        } catch (e){
            console.log(e);
        }
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }


}