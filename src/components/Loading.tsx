import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
// import { TbLoader2 } from "react-icons/tb";
// import { VscLoading } from "react-icons/vsc";
// import { TbLoader } from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";
import { Context } from '../Context';

function Loading() {
    const {functionalStore} = useContext(Context)
    return (
        <div>
            {functionalStore.isLoading &&  
                (<div className='fullscreen-block'>
                    <BiLoaderCircle id='loading-icon'/>
                </div>)
            }
        </div>
    )
}

export default observer(Loading);
