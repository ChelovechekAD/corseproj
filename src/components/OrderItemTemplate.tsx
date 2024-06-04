import {observer} from "mobx-react-lite"
import OrderItemInfo from "../models/OrderItemInfo"
import React from "react"

interface OrderItemTemplteProps {
    el: OrderItemInfo,
}

function OrderItemTemplate({el}: OrderItemTemplteProps) {


    return (
        <div className='item'>
            <img src={"./img/" + el.imageLink} alt='TEXT'/>
            <h2>{el.name}</h2>
            <p>{new Intl.NumberFormat().format(el.price)}$</p>
            <p>Count: {el.count}</p>
            {/* <FaTrash className='delete-icon' onClick={()=> this.props.onDelete(this.props.item.productId)}/> */}
        </div>
    )

}

export default observer(OrderItemTemplate)