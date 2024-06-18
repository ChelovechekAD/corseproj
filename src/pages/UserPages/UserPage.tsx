import React, {useState} from 'react';
import UserInfo from "./UserInfo";
import "../../static/styles/user-page.css"
import UserOrders from "./UserOrders";

function UserPage() {

    const [path, setPath] = useState({
            component: <UserInfo/>
        }
    );

    const [selected, setSelected] = useState(0)

    return (
        <div className="user-page">
            <div className="nav-menu">
                <nav className={`nav-menu-link ${selected === 0 ? 'selected' : ''}`}
                     onClick={() => {
                         setSelected(0)
                         setPath({component: <UserInfo/>})
                     }}>Личная информация
                </nav>
                <nav className={`nav-menu-link ${selected === 1 ? 'selected' : ''}`}
                     onClick={() => {
                         setSelected(1)
                         setPath({component: <UserOrders/>})
                     }}>Заказы
                </nav>
               {/* <nav  className={`nav-menu-link ${selected === 2 ? 'selected' : ''}`}
                     onClick={() => {
                         setSelected(2)
                         setPath({component: <UserInfo/>})
                     }}>Отзывы
                </nav>*/}
            </div>
            {path.component}
        </div>
    );
}

export default UserPage;