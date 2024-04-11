import React from 'react'
import OrdersList from '../components/OrdersList'
import "../static/styles/admin-panel.css"
import { adminStore } from '../Context'
import { Pagination } from '@mui/material'
import { observer } from 'mobx-react-lite'
import OrderItemTemplate from '../components/OrderItemTemplate'
import OrderItemBlock from '../components/OrderItemBlock'

 function AdminPanel() {
  return (
    <div className='admin-page'>

        <div className='order'>
          <OrdersList/>
          <Pagination className='pagination-block'
            count={adminStore.countPages}
            page={adminStore.curPage}
            onChange={(_, num) => {adminStore.setCurPage(num)}}>
          </Pagination>
        </div>
        <div className='order-items'>
          <OrderItemBlock/>
          {adminStore.countOfOrderItems !== 0 && <Pagination className='pagination-block'
          count={adminStore.countOfOrderItems}
          page={adminStore.curOrderItemsPage}
          onChange={(_, num) => {adminStore.setCurOrderItemsPage(num)}}>
          </Pagination>}
        </div>
    </div>
  )
}

export default observer(AdminPanel);
