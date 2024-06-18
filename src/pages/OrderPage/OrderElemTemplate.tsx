import React, {useEffect} from 'react'
import OrderPreview from '../../models/OrderPreview'
import "../../static/styles/order-info.css"

interface OrderInfoProps {
    el: OrderPreview,
    callback: any
}

function OrderElemTemplate(props: OrderInfoProps) {

    return (
        <div className="order-item"
             onClick={() => props.callback(props.el.id)}>
            <h2>Order#{props.el.id}</h2>
            <p>Creation date: {props.el.date}</p>
            <p>Order status: <b>{props.el.orderStatus}</b></p>
        </div>
    )
}


export default OrderElemTemplate;