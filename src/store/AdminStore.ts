import {makeAutoObservable} from "mobx";
import OrderPreview from "../models/OrderPreview";
import OrderService from "../services/OrderService";
import {COUNT_OF_ORDER_ITEMS_PER_PAGE, COUNT_OF_ORDERS_PER_PAGE} from "../utils/Constants";
import OrderItemInfo from "../models/OrderItemInfo";
import CatalogService from "../services/CatalogService";
import {catalogStore} from "../Context";

export default class AdminStore {

    orders: OrderPreview[] = [];
    curPage: number = 1;
    countOfOrders: number = 0;
    countPages: number = 0;
    selectedOrder: number = 0;

    orderItemsList: OrderItemInfo[] = [];
    curOrderItemsPage: number = 1;
    countOfOrderItems: number = 0;
    countOrderItemsPages: number = 0;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    selectOrder(orderId: number) {
        this.selectedOrder = orderId;
        this.getOrderItemsPage();
    }

    setOrder(orderList: OrderPreview[]) {
        this.orders = orderList;
    }

    setItems(orderItemsList: OrderItemInfo[]) {
        this.orderItemsList = orderItemsList
    }

    setCurPage(page: number) {
        this.curPage = page;
        this.getOrderPage()
    }

    setCurOrderItemsPage(page: number) {
        this.curOrderItemsPage = page;
        this.getOrderItemsPage()
    }

    setCountOfOrder(i: number) {
        this.countOfOrders = i;
    }

    setCountOfOrderItems(i: number) {
        this.countOfOrderItems = i;
    }

    setCountOfPages() {
        this.countPages = Math.ceil(this.countOfOrders / COUNT_OF_ORDERS_PER_PAGE);
    }

    setCountOfOrderItemsPage() {
        this.countOfOrderItems = Math.ceil(this.countOfOrderItems / COUNT_OF_ORDER_ITEMS_PER_PAGE);
    }

    async getOrderPage() {
        try {
            const resp = await OrderService.getListOfOrders(this.curPage);
            this.setOrder(resp.data.orderList);
            this.setCountOfOrder(resp.data.count);
            this.setCountOfPages();
            console.log(this.orders)
        } catch (e) {
            console.log(e)
        }
    }

    async getOrderItemsPage() {
        try {
            const resp = await OrderService.getOrderItems(this.selectedOrder, this.curOrderItemsPage);
            this.setItems(resp.data.orderItemProductDTOList);
            this.setCountOfOrderItems(resp.data.totalCountOfItems);
            this.setCountOfOrderItemsPage();
            console.log(this.orders)
        } catch (e) {
            console.log(e)
        }
    }

    async addNewCategory(name: string, callback: any)  {
        try {
            await CatalogService.addNewCategory(name);
            callback();
            catalogStore.getAllCategories()
                .then(() => console.log("Category successfully added."))
        } catch (e) {
            console.log("During category creation process something went wrong! Error: %s", e)
        }
    }

}