import React, {FC, useContext} from 'react'
import {Context} from '..';
import {VscAccount} from "react-icons/vsc";
import {MdLogout} from "react-icons/md";
import {Link} from 'react-router-dom';


export const UserInfo: FC = () => {
    const {store} = useContext(Context);

    return (
        <div className='user-info'>
            <Link to="/account"><VscAccount className='account' onClick={() => store.setPath("/account")}/></Link>
            {store.user.roles.includes('ROLE_ADMIN') &&
                <Link to="/admin" id='admin-panel' onClick={() => store.setPath("/admin")}>Админ Панель</Link>}
            <h1>{store.user?.name} {store.user?.surname}</h1>
            <MdLogout className='exit' onClick={store.logout}/>
        </div>
    )
}
