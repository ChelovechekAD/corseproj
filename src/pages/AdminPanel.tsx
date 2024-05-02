import React from 'react'
import OrdersList from '../components/OrdersList'
import "../static/styles/admin-panel.css"
import { adminStore, store } from '../Context'
import { Pagination } from '@mui/material'
import { observer } from 'mobx-react-lite'
import OrderItemTemplate from '../components/OrderItemTemplate'
import OrderItemBlock from '../components/OrderItemBlock'

 function AdminPanel() {
  return (
    <div className='admin-page'>

        <div className='order'>
          <OrdersList/>
          {adminStore.countPages > 1 && <Pagination className='pagination-block'
            count={adminStore.countPages}
            page={adminStore.curPage}
            onChange={(_, num) => {adminStore.setCurPage(num)}}>
          </Pagination>}
        </div>
        <div className='order-items'>
          {/* <div className='order-user-info'>
            <p>Имя: {store.user.name}</p>
            <p>Фамилия: {store.user.surname}</p>
            <p>Номер телефона: {store.user.phoneNumber}</p>
            <p>Номер дома: {store.user.building}</p>
            <p>Улица: {store.user.street}</p>
            <p>Город: {store.user.city}</p>
          </div> */}
          <OrderItemBlock/>
          {adminStore.countOfOrderItems > 1 && <Pagination className='pagination-block'
          count={adminStore.countOfOrderItems}
          page={adminStore.curOrderItemsPage}
          onChange={(_, num) => {adminStore.setCurOrderItemsPage(num)}}>
          </Pagination>}
        </div>
    </div>
  )
}

export default observer(AdminPanel);
