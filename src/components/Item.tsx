import React, {Component} from 'react'
import {Product} from '../models/Product';
import {AiFillStar} from "react-icons/ai";
import Counter from '../fragments/Counter';
import {Link, Route} from "react-router-dom";
import ProductPage from "../pages/ProductPage";
import {store} from "../Context";

interface ItemProps {
    item: Product;
    // onShowItem: (item: any) => void;
    onAdd: (item: Product, count: number) => void;
}

interface ItemState {
    count: number
}

export class Item extends Component<ItemProps, ItemState> {

    constructor(props: any) {
        super(props);
        this.state = {
            count: 1,
        }

    }

    render() {
        return (
            <div className='item'>
                <Link to={`/product/${this.props.item.id}`} onClick={() => store.setPath(`/product/${this.props.item.id}`)}>
                    <img src={"./img/" + this.props.item.imageLink} alt='TEXT'/>
                </Link>
                <h2>{this.props.item.name}</h2>
                <p>{this.props.item.description}</p>
                <p className='rating'>{this.props.item.rating}<AiFillStar className='rating-icon'/></p>
                <b>{Intl.NumberFormat().format(this.props.item.price)}$</b>
                <Counter onValueChange={(e: number) => {
                    this.setState(() => ({count: e}))
                }}/>
                <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item, this.state.count)}>+</div>
            </div>
        )
    }
}

export default Item