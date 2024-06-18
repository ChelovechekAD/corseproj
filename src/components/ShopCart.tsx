import React, {useContext} from 'react'
import Order from './Order';
import {observer} from 'mobx-react-lite';
import {Context} from '../Context';
import OrderCartStore from '../store/OrderCartStore';
import {CartItem} from '../models/CartItem';
import {Link} from 'react-router-dom';

const showOrders = (items: CartItem[], store: OrderCartStore) => {
    return (
        <div>
            {items.map((el) => (
                <Order onDelete={store.deleteItem} key={el.productId} item={el}/>
            ))}
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


function ShopCart() {
    const {orderCartStore} = useContext(Context);
    const {store} = useContext(Context);

    return (
        <div className='shop-cart'>
            {orderCartStore.items.length > 0 ?
                showOrders(orderCartStore.items, orderCartStore) : showNothing()}
            {orderCartStore.items.length > 0 && (
                <p className='summa'>Сумма: {new Intl.NumberFormat().format(orderCartStore.sumPrice)}$</p>)}
            {orderCartStore.items.length > 0 && (<Link to='/order' className='do-order' onClick={() => {
                store.setPath("/order");
                orderCartStore.setCartOpen()
            }}>Оформить</Link>)}
        </div>
    )
}

export default observer(ShopCart);




