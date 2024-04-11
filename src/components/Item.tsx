import React, { Component } from 'react'
import { Product } from '../models/Product';
import { AiFillStar } from "react-icons/ai";
import Counter from '../fragments/Counter';

interface ItemProps{
  item: Product;
  // onShowItem: (item: any) => void;
  onAdd: (item: Product, count: number) => void;
}

interface ItemState{
  count: number
}

export class Item extends Component<ItemProps, ItemState> {

  constructor(props: any){
    super(props); 
    this.state = {
      count: 1,
    }

  }

  render() {
    return (
      <div className='item'>
        <img src={"./img/" + this.props.item.imageLink} alt='TEXT'/>
        <h2>{this.props.item.name}</h2>
        <p>{this.props.item.description}</p>
        <p className='rating'>{this.props.item.rating}<AiFillStar className='rating-icon'/></p> 
        <b>{this.props.item.price}$</b>
        <Counter onValueChange={(e:number) => {this.setState(()=>({count: e}))}}/>
        <div className='add-to-cart' onClick={()=>this.props.onAdd(this.props.item, this.state.count)}>+</div>
      </div>
    )
  }
}

export default Item