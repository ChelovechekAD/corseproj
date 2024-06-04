import React, { Component } from 'react'
import { FaTrash } from 'react-icons/fa6'
import { CartItem } from '../models/CartItem';

interface OrderProps {
  item: CartItem;
  onDelete: (id: number) => void;
}

export class Order extends Component<OrderProps, {}> {
  render() {
    return (
      <div className='item'>
        <img src={"./img/" + this.props.item.imageLink} alt='TEXT'/>
        <h2>{this.props.item.name}</h2>
        <p>{new Intl.NumberFormat().format(this.props.item.price*this.props.item.quantity)}$</p>
        <p>Count: {this.props.item.quantity}</p>
        <FaTrash className='delete-icon' onClick={()=> this.props.onDelete(this.props.item.productId)}/>
      </div>
    )
  }
}

export default Order