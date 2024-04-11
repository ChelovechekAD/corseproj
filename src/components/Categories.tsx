import React, { Component } from 'react'
import {catalogStore } from '../Context';
import { observer } from 'mobx-react';



export class Categories extends Component {

    render() {
        return (
                <div className='categories'>
                  <div onClick={ ()=>catalogStore.selectCategory(0)} className={`${catalogStore.selectedCategory === 0 && 'active'}`}>Всё</div>
                  {catalogStore.categories.map(el => (
                    <div key={el.id} onClick={() => catalogStore.selectCategory(el.id)} className={`${catalogStore.selectedCategory === el.id && 'active'}`}>{el.categoryName}</div>
                  ))}
               </div>
        )
    }
}

export default observer(Categories)