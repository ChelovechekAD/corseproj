import React, {useContext, useState} from 'react'
import {IUser} from '../models/IUser';
import UpdateUserRequest from '../models/request/UpdateUserRequest';
import {Context} from '../Context';

interface OrderFormProps {
    userIn: IUser,
}

export default function OrderForm({userIn}: OrderFormProps) {

    const user: IUser = userIn;
    const {store} = useContext(Context);

    const [formData, setFormData] = useState<UpdateUserRequest>({
        id: parseInt(user.id),
        name: user.name,
        surname: user.surname,
        building: user.building,
        street: user.street,
        city: user.city,
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData.street + " " + user.street)
    };

    const handleSubmit = (e: any) => {
        // const validationErrors = validateForm(formData);
        // if (Object.keys(validationErrors).length === 0) {
        //   // Form is valid, proceed with submission
        //   console.log('Form submitted:', formData);
        //   setErrors({});
        //   store.login(formData);
        // } else {
        //   // Update errors state to display validation errors
        //   setErrors(validationErrors);
        // }
        store.updateUser(formData);
    };

    return (
        <div className='form-input'>
            {(store.user.city === "" || store.user.building === "" || store.user.street === "")
                ? <p>Перед оформлением заказа необходимо ввести адрес</p>
                : <p>Вы можете изменить адрес доставки</p>}
            <input onChange={handleChange}
                   name='building'
                   value={formData.building}
                   type="text"
                   placeholder='Building'
            />
            {/* {errors.email && <span>{errors.email}</span>} */}
            <input
                name='street'
                onChange={handleChange}
                value={formData.street}
                type="text"
                placeholder='Street'
            />
            <input
                name='city'
                onChange={handleChange}
                value={formData.city}
                type="text"
                placeholder='City'
            />
            {/* {errors.password && <span>{errors.password}</span>} */}
            <button onClick={handleSubmit}>
                Подтвердить
            </button>
        </div>
    )
}
