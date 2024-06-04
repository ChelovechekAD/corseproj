import React, {FC, useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import AuthForm from './components/AuthForm';
import ErrorMessageBlock from './components/ErrorMessageBlock';
import Page from './Page';
import { Context } from './Context';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import { UserInfo } from './components/UserInfo';
import NotFound from './pages/NotFound';
import OrderPage from './pages/OrderPage';
import AdminPanel from './pages/AdminPanel';

const App: FC = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        console.log("checkAuth")
        if (localStorage.getItem('access-token')) {
            store.checkAuth()
            console.log("User: " + store.user.email)
        }
    }, [store])

    if (!store.isAuth) {
        console.log(store.errorOccurred)
        return (
            <div>
                <AuthForm/>
                {store.errorOccurred && <ErrorMessageBlock/>}
            </div>
        )
    }
    
        return (
            <div className='wrapper'>
                <BrowserRouter>
                {/* <Page/> */}
                    <Routes>
                        <Route path='/' element={<Layout/>}>
                            <Route path='/order' element={<OrderPage/>}/>
                            <Route path='/admin' element={<AdminPanel/>}/>
                            <Route path='/' element={<Page/>}/>
                            <Route path='/contacts' element={<NotFound/>}/>
                            <Route path='/about' element={<NotFound/>}/>
                            <Route path='/*' element={<NotFound/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
                {store.errorOccurred && <ErrorMessageBlock/>}
            </div>
        );
    

    
};

export default observer(App);