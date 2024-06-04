import React, {useContext, useEffect} from 'react'
import {Context} from '..'

export default function ErrorMessageBlock() {

    const {store} = useContext(Context);

    useEffect(() => {
        const delay = 10000;
        const timerId = setTimeout(() => {
            store.handleError();
        }, delay);
        return () => clearTimeout(timerId);
    }, [store])


    return (
        <div id='error-message'>
            <p>Error: </p>
            <p>{store.errorMessage}</p>
        </div>

    )
}
