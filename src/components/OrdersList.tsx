import React, {useEffect} from 'react'
import {adminStore} from '../Context'
import OrderInfo from './OrderInfo'
import {observer} from 'mobx-react-lite';

function OrdersList() {

    useEffect(() => {
        if (adminStore.orders.length === 0) {
            adminStore.getOrderPage();
        }
    })

    return (
        <div className="list-block">
            {adminStore.orders.map(e => (
                <OrderInfo el={e} key={e.id}/>
            ))}
        </div>
    )
}

export default observer(OrdersList)