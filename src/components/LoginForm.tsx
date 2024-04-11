import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import LoginFormData from '../models/request/LoginFormData';

const LoginForm: FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<LoginFormData>({});

    const {store} = useContext(Context);

    const emailRegex = /^\S+@\S+\.\S+$/;

    const handleChange = (e : any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      
    const handleSubmit = (e: any) => {
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
          // Form is valid, proceed with submission
          console.log('Form submitted:', formData);
          setErrors({});
          store.login(formData);
        } else {
          // Update errors state to display validation errors
          setErrors(validationErrors);
        }
    };   

    const validateForm = (data: typeof formData) => {
        let errors: LoginFormData = {};
        if (!data.email) {
          errors.email = '*Email is required';
        } else if (!emailRegex.test(data.email)) {
          errors.email = '*Email is invalid';
        }
        if (!data.password) {
          errors.password = '*Password is required';
        }
        return errors;
      };

    return (
        <div className='login-form'>
             <input
                onChange={handleChange}
                name='email'
                value={formData.email}
                type="text"
                placeholder='Email'
            />
            {errors.email && <span>{errors.email}</span>}
            <input
                name='password'
                onChange={handleChange}
                value={formData.password}
                type="password"
                placeholder='Пароль'
            />
            {errors.password && <span>{errors.password}</span>}
            <button onClick={handleSubmit}>
                Логин
            </button>
        </div>
    );
};

export default observer(LoginForm);