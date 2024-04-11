import OrderItem from "./OrderItem";

export default interface OrderTemplate{
    userId: number;
    orderItems: OrderItem[];
}