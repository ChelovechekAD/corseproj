import React, {useEffect} from 'react';
import {productPageStore, userStore} from "../../Context";
import OrderElemTemplate from "../OrderPage/OrderElemTemplate";
import {observer} from "mobx-react-lite";
import {Pagination} from "@mui/material";
import OrderItemInfo from "../../models/OrderItemInfo";
import OrderService from "../../services/OrderService";
import {COUNT_OF_ORDER_ITEMS_PER_PAGE} from "../../utils/Constants";
import OrderItemTemplate from "../OrderPage/OrderItemTemplate";

function UserOrders() {

    const [init, setInit] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState(-1);
    const [orderItems, setOrderItems] = React.useState({
        orderItemsList: [] as OrderItemInfo[],
        pageNum:  1,
        countOfOrderItems: 0,
        countOrderItemsPages: 0
    });

    const tryToGetOrderItems = () => {
        const response = userStore.tryToGetOrderItems(orderItems.pageNum, selectedOrder);
        response.then((resp) => {
            let countPages = Math.ceil(resp.data.totalCountOfItems / COUNT_OF_ORDER_ITEMS_PER_PAGE)
            console.log(resp.data.totalCountOfItems + " " + resp.data.orderItemProductDTOList);
            setOrderItems({
                ...orderItems,
                orderItemsList: resp.data.orderItemProductDTOList,
                countOfOrderItems: resp.data.totalCountOfItems,
                countOrderItemsPages: countPages
            })
        }).catch((e) => {
            console.error(e);
        })
    }

    const showNothing = () => {
        return <div>
            Заказов не найдено.
        </div>
    }

    const showNothingOrderItems = () => {
        return <div>
            Предметы заказа не найдены.
        </div>
    }

    const showOrderItem = () => {
        return <div className="order-items-list">
            {orderItems.orderItemsList.map((orderItem) => {
                return <OrderItemTemplate el={orderItem} key={orderItem.productId}/>
            })}
        </div>
    }

    const tryToGetOrders = (pageNum: number) => {
        userStore.pageNum = pageNum;
        userStore.tryToFetchUserOrders();
    }

    const showOrders = () => {
        return <div>
            {userStore.userOrders?.map((el) => {
                return <div key={el.id} className={`${selectedOrder === el.id ? 'active' : null}`}>
                    <OrderElemTemplate  el={el} callback={setSelectedOrder}/>
                    {orderItems.orderItemsList ? showOrderItem() : showOrderItem()}
                </div>
            })}
            {userStore.pageNum >= 1 && <Pagination
                className='pagination-block'
                count={userStore.maxCountOfPages}
                page={userStore.pageNum}
                onChange={(_, num) => {
                    tryToGetOrders(num)
                }}
            />}
        </div>
    }

    useEffect(() => {
        if (selectedOrder !== -1) {
            tryToGetOrderItems();
        }
        if (init) return;
        if (userStore.userOrders == null) {
            userStore.tryToFetchUserOrders();
        }
        setInit(true);
    }, [userStore.userOrders, selectedOrder]);

    return (
        <>
            {init && <div className="user-orders">
                {userStore.userOrders ? showOrders() : showNothing()}
            </div>}
        </>
    )
}

export default observer(UserOrders);