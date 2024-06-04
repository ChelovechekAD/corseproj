import React, {useContext} from 'react'
import {FaCartShopping} from "react-icons/fa6";
import {UserInfo} from './UserInfo';
import ShopCart from './ShopCart';
import {Link} from 'react-router-dom';
import Loading from './Loading';
import {Context, orderCartStore} from '../Context';
import {observer} from 'mobx-react-lite';
import OrderCartStore from '../store/OrderCartStore';
import FunctionalStore from '../store/FunctionalStore';


async function loadCart(cartStore: OrderCartStore, functionalStore: FunctionalStore) {
    cartStore.setCartOpen();
    if (cartStore.cartOpen === true && orderCartStore.items.length === 0) {
        // functionalStore.setLoading(true);
        await cartStore.getCart();
        functionalStore.setLoading(false);
    }

}

function Header() {
    const {orderCartStore} = useContext(Context);
    const {store} = useContext(Context);
    const {functionalStore} = useContext(Context)

    return (
        <header>
            <Loading/>
            <div>
                <span className='logo'>House Staff</span>
                <UserInfo/>

                <ul className='nav'>
                    <Link className='li' to="/" onClick={() => store.setPath("/")}>Каталог</Link>
                    <Link className='li' to="/contacts" onClick={() => store.setPath("/contacts")}>Контакты</Link>
                    <Link className='li' to="/about" onClick={() => store.setPath("/about")}>Про нас</Link>
                </ul>


                <FaCartShopping onClick={() => loadCart(orderCartStore, functionalStore)}
                                className={`shop-cart-button ${orderCartStore.cartOpen && 'active'}`}/>

                {orderCartStore.cartOpen && <ShopCart/>}
            </div>
            <div className={`presentation ${store.path !== "/" && 'none'}`}></div>
        </header>
    )
}

export default observer(Header);