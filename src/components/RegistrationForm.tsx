import { observer } from 'mobx-react';
import React, { FC, useContext, useState } from 'react'
import { Context } from '..';
import RegistrationFormData from '../models/request/RegistrationFormData';

const RegistrationForm: FC = () => {
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: '',
        password: '',
        name: '',
        surname: '',
        phoneNumber: '',
        passwordConfirm: ''
      });
    const [errors, setErrors] = useState<RegistrationFormData>({});

    const {store} = useContext(Context);

    const nameRegex = /^[a-zA-Z'-]+$/;
    const surnameRegex = /^[a-zA-Z'-]+(?: [a-zA-Z'-]+)*$/;
    const phoneNumberRegex = /^\+?[0-9()-]+$/;
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
          store.registration(formData);
        } else {
          // Update errors state to display validation errors
          setErrors(validationErrors);
        }
 
    };   

    const validateForm = (data: typeof formData) => {
        let errors: RegistrationFormData = {};
        if (!data.email) {
          errors.email = '*Email is required';
        } else if (!emailRegex.test(data.email)) {
          errors.email = '*Email is invalid';
        }

        if (!data.name) {
            errors.name = '*Name is required';
          } else if (!nameRegex.test(data.name)) {
            errors.name = '*Name is invalid';
          }

          if (!data.surname) {
            errors.surname = '*Surname is required';
          } else if (!surnameRegex.test(data.surname)) {
            errors.surname = '*Surname is invalid';
          }

          if (!data.phoneNumber) {
            errors.phoneNumber = '*Phone number is required';
          } else if (!phoneNumberRegex.test(data.phoneNumber)) {
            errors.phoneNumber = '*Phone number is invalid';
          }

        if (!data.password) {
          errors.password = '*Password is required';
        } else if (data.password.length < 6) {
          errors.password = '*Password must be at least 6 characters long';
        }

        if (!data.passwordConfirm) {
            errors.passwordConfirm = '*Password confirm is required';
          } else if (data.password !== data.passwordConfirm) {
            errors.passwordConfirm = '*Password and password confirm not mutch.';
          }
        return errors;
      };
       
    return (
        <div className='reg-form'>
            <input
                onChange={handleChange}
                name='email'
                value={formData.email}
                type="text"
                placeholder='Email'
            />
            {errors.email && <span>{errors.email}</span>}
            <input
                name='name'
                onChange={handleChange}
                value={formData.name}
                type="text"
                placeholder='Имя'
            />
            {errors.name && <span>{errors.name}</span>}
            <input
                name='surname'
                onChange={handleChange}
                value={formData.surname}
                type="text"
                placeholder='Фамилия'
            />
            {errors.surname && <span>{errors.surname}</span>}
            <input
                name='phoneNumber'
                onChange={handleChange}
                value={formData.phoneNumber}
                type="text"
                placeholder='Телефон'
            />
            {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
            <input
                name='password'
                onChange={handleChange}
                value={formData.password}
                type="password"
                placeholder='Пароль'
            />
            {errors.password && <span>{errors.password}</span>}
            <input
                name='passwordConfirm'
                onChange={handleChange}
                value={formData.passwordConfirm}
                type="password"
                placeholder='Повторите пароль'
            />
            {errors.passwordConfirm && <span>{errors.passwordConfirm}</span>}
            <button onClick={handleSubmit}>
                Регистрация
            </button>
        </div>
    );
};

export default observer(RegistrationForm);