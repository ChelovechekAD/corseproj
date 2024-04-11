import React, { useEffect } from 'react'
import { adminStore } from '../Context';
import { observer } from 'mobx-react-lite';
import OrderItemTemplate from './OrderItemTemplate';
 function OrderItemBlock() {

    useEffect(()=>{
        if (adminStore.orderItemsList.length === 0){
            adminStore.getOrderItemsPage();
        }
    })

    return (
        
        <div>
                {adminStore.selectedOrder !== 0 && adminStore.orderItemsList.map((e)=>(
                <OrderItemTemplate el={e} key={e.productId}/>
                ))}
        </div>
        
    )
}


export default observer(OrderItemBlock)
