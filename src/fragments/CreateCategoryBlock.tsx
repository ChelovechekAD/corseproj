import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import AdminStore from "../store/AdminStore";
import {adminStore} from "../Context";

interface Props {
    callback: any
}

function CreateCategoryBlock(props: Props) {

    const [categoryName, setCategoryName] = React.useState<string>('');

    const handleClose = () => {
        props.callback();
    };

    const tryToCreateNewCategory = () => {
        adminStore.addNewCategory(categoryName, handleClose);
    }

    return (
        <div className="create-category-page">
            <div className="create-category-block">
                <div className="title-category">
                    <p>Создание новой категории</p>
                    <IoCloseOutline className="close" onClick={()=>handleClose()}/>
                </div>
                <div className="body-category">
                    <p>Введите название категории:</p>
                    <input value={categoryName} onChange={event => {
                        setCategoryName(event.target.value)
                    }}/>
                    <FaCheck className="check" onClick={() => tryToCreateNewCategory()} />
                </div>
            </div>
        </div>

    );
}

export default CreateCategoryBlock;
