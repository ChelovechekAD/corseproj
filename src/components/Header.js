import React, { useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import Order from './Order';

const showOrders = (props) => {
  
  return (
    <div>
      {props.orders.map(el => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
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

export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false);
  let summa = 0;
  props.orders.forEach(el => summa += Number.parseFloat(el.price));

  return (
    <header>
        <div>
            <span className='logo'>House Staff</span>
            <ul className='nav'>
                <li>Про нас</li>
                <li>Контакты</li>
                <li>Кабинет</li>
            </ul>
            <FaCartShopping onClick={()=>setCartOpen(cartOpen = !cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`}/>

            {cartOpen && (
                <div className='shop-cart'>
                  {props.orders.length > 0 ?
                      showOrders(props) : showNothing()}
                  {props.orders.length > 0 && (<p className='summa'>Сумма: {new Intl.NumberFormat().format(summa)}$</p>)}
                
                </div>
            )}
        </div>
        <div className='presentation'></div>
    </header>
  )
}
