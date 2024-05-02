import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { orderCartStore, store } from '../Context'
import { IUser } from '../models/IUser'
import OrderForm from '../components/OrderForm';
import { CartItem } from '../models/CartItem';
import Order from '../components/Order';
import '../static/styles/order-page.css';
import { useNavigate } from 'react-router-dom';

function OrderPage() {
    const user: IUser = store.user;
    const items: CartItem[] = orderCartStore.items;
    const navigate = useNavigate()
    
    useEffect(()=>{
        console.log(user.city)
        if (orderCartStore.items.length === 0){
            orderCartStore.getCart(parseInt(user.id));
        }
        // orderCartStore.getCart(parseInt(user.id))
        if (user.building == null || user.city == null || user.street == null){
            orderCartStore.setUserAddressPresent(false);
        }else{
            orderCartStore.setUserAddressPresent(true);
        }
    })

    const onCl = ()=>{
        orderCartStore.createOrder(items);
        navigate('/');
    }

    return (

        <div className='order-page'>
            <div className='items'>
                {items.map((el) => (
                    <Order onDelete={orderCartStore.deleteItem} key={el.productId} item={el} />
                ))}
            </div>
            <div className='form'>
                <OrderForm userIn={user}/>
                {orderCartStore.getUserAddressPresent() && (<p>Total price: {new Intl.NumberFormat().format( orderCartStore.sumPrice)}$</p>)}
                {orderCartStore.getUserAddressPresent() && (<button onClick={onCl}>Заказать</button>)}
            </div>
        </div>

    )
}

export default observer(OrderPage);