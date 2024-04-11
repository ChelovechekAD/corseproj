import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { Context } from '..';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import '../static/styles/auth.css';



function AuthForm() {
    const {store} = useContext(Context);

    return (
        <div className='auth-form'>
            <div className='title'>
                <h1>Home Stuff</h1>
            </div>
            <div>
                <div className='types'>
                    <div className={`${store.itLogin && 'active' }`} onClick={() => store.setItLogin(true)}>
                        <p>Авторизация</p>
                    </div>
                    <div className={`${!store.itLogin && 'active' }`} onClick={() => store.setItLogin(false)}>
                        <p>Регистрация</p>
                    </div>
                </div>
                {store.itLogin ? <LoginForm/> : <RegistrationForm/>}
                
            </div>
           
        </div>
    )
}

export default observer(AuthForm);
