import OrderPreview from "../OrderPreview";

export default interface OrdersResponse {
    orderList: OrderPreview[],
    count: number,
}