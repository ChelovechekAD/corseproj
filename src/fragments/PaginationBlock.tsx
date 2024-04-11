import React, { useContext } from 'react'
import {Pagination} from '@mui/material';
import { Context } from '../Context';
import { observer } from 'mobx-react-lite';


function PaginationBlock() {
    const {catalogStore}  = useContext(Context)
    return (
        <Pagination 
            className='pagination-block'
            count={catalogStore.countPages}
            page={catalogStore.curPage}
            onChange={(_, num) => {catalogStore.setCurPage(num)}} 
        />
    )
}


export default observer(PaginationBlock);