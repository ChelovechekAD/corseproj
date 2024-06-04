import OrderItemInfo from "../OrderItemInfo";

export default interface OrderItemsResponse {
    orderItemProductDTOList: OrderItemInfo[],
    totalCountOfItems: number,
}