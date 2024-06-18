import React, {useState} from 'react';
import {IMG_NOT_FOUND_PATH} from "../../utils/Constants";
import {store} from "../../Context";
import UpdateUserRequest from "../../models/request/UpdateUserRequest";
import { FaEdit } from "react-icons/fa";
import { LuCheckCircle2 } from "react-icons/lu";

function UserInfo() {
    const [edit, setEdit] = React.useState(false);
    const [formData, setFormData] = useState<UpdateUserRequest>({
        id: store.user.id,
        name: store.user.name,
        surname: store.user.surname,
        building: store.user.building,
        street: store.user.street,
        city: store.user.city,
    });

    const changeEditState = (edit: boolean) => {
        setEdit(edit);
    }

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const tryToSave = () => {
        store.updateUser(formData, changeEditState)
    }

    return (
        <div className="user-info-page">
            <div className="main-info-block">
                <img src={'./img' + IMG_NOT_FOUND_PATH} alt="not-found"/>
                <p>{store.user.name} {store.user.surname}</p>
                <p>{store.user.email}</p>
            </div>
            <div className="info-block">
                <div>
                    <p>Имя: </p>
                    <input className={`${edit ? 'edit' : null}`}
                           disabled={!edit}
                           onChange={handleChange}
                           name='name'
                           value={formData.name}
                           type="text"
                           placeholder='Name'
                    />
                </div>
                <div>
                    <p>
                        Фамилия:
                    </p>
                    <input className={`${edit ? 'edit' : null}`}
                           disabled={!edit}
                           onChange={handleChange}
                           name='surname'
                           value={formData.surname}
                           type="text"
                           placeholder='Surname'
                    />
                </div>
                <div>
                    <p>
                        Номер дома:
                    </p>
                    <input className={`${edit ? 'edit' : null}`}
                           disabled={!edit}
                           onChange={handleChange}
                           name='building'
                           value={formData.building}
                           type="text"
                           placeholder='Building'
                    />
                </div>
                <div>
                    <p>
                        Улица:
                    </p>
                    <input
                        name='street' className={`${edit ? 'edit' : null}`}
                        disabled={!edit}
                        onChange={handleChange}
                        value={formData.street}
                        type="text"
                        placeholder='Street'
                    />
                </div>
                <div>
                    <p>
                        Город:
                    </p>
                    <input
                        disabled={!edit}
                        name='city' className={`${edit ? 'edit' : null}`}
                        onChange={handleChange}
                        value={formData.city}
                        type="text"
                        placeholder='City'
                    />
                </div>
                {edit ? <LuCheckCircle2 className="btn" onClick={() => tryToSave()}/> :
                    <FaEdit className="btn" onClick={() => changeEditState(true)}/>}
            </div>
        </div>
    );
}

export default UserInfo;