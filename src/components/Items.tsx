import React, {Component} from 'react'
import Item from './Item'
import {observer} from 'mobx-react';
import {catalogStore, orderCartStore} from '../Context';


const showProducts = () => {
    return (
        <div>
            {catalogStore.products.map((el) => (
                <Item key={el.id} item={el} onAdd={orderCartStore.saveItem}/>))}

        </div>
    )
}

const showNothing = () => {
    return (
        <div className='empty'>
            <h2>Товаров нет</h2>
        </div>
    )
}

export class Items extends Component {
    render() {
        return (
            <main>
                {catalogStore.totalCountProducts !== 0 ? showProducts() : showNothing()}
            </main>
        )
    }
}

export default observer(Items);