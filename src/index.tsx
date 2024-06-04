import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {adminStore, catalogStore, Context, functionalStore, orderCartStore, store} from './Context';


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Context.Provider value={{
        store,
        catalogStore,
        functionalStore,
        orderCartStore,
        adminStore,
    }}>

        <App/>


    </Context.Provider>,
)
export {Context};

