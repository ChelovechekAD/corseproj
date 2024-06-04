import React from 'react'
import OrderPreview from '../models/OrderPreview'
import "../static/styles/order-info.css"
import { adminStore } from '../Context'
import { observer } from 'mobx-react-lite'

interface OrderInfoProps{
  el: OrderPreview,
} 

function OrderInfo({el}: OrderInfoProps ){
  return (
    <div className={`${adminStore.selectedOrder === el.id && 'active'} order-item`} onClick={()=>adminStore.selectOrder(el.id)}>
        <h2 >Order#{el.id}</h2>
        <p>Creation date: {el.date}</p>
        <p>Order status: <b>{el.orderStatus}</b></p>
    </div>
  )
}


export default observer(OrderInfo);