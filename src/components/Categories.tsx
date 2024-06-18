import React from 'react'
import {catalogStore, store} from '../Context';
import {observer} from 'mobx-react';
import {BsPlusLg} from "react-icons/bs";
import CreateCategoryBlock from "../fragments/CreateCategoryBlock";


function Categories() {

    const [newCategoryWindow, setNewCategoryWindow] = React.useState(false);

    const closeNewCategoryWindow = () => {
        setNewCategoryWindow(false);
    }

    return (
        <div className='categories-block'>
            <div className='categories'>
                <div onClick={() => catalogStore.selectCategory(0)}
                     className={`${catalogStore.selectedCategory === 0 && 'active'}`}>
                    Всё
                </div>
                {catalogStore.categories.map(el => (
                    <div key={el.categoryId}
                         onClick={() => catalogStore.selectCategory(el.categoryId)}
                         className={`${catalogStore.selectedCategory === el.categoryId && 'active'}`}>
                        {el.categoryName}
                    </div>
                ))}
                {store.user.roles.includes("ROLE_ADMIN") &&
                    <div className="add-new-category" onClick={() =>
                        setNewCategoryWindow(true)
                    }>
                        <BsPlusLg className="add-new-category-btn" />
                    </div>
                }
            </div>
            {newCategoryWindow.valueOf() &&
                <CreateCategoryBlock callback={closeNewCategoryWindow}/>
            }
        </div>
    )
}

export default observer(Categories)