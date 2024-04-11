import React, { useState } from 'react'
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";

interface CounterProps {
    onValueChange: (value: number) => void;
}

export default function Counter({onValueChange}: CounterProps) {

    const [value, setValue] = useState(1);
    
    const increase = () => {
        if (value < 99){
            setValue(value+1);
            onValueChange(value+1);
        } 
    }

    const decrease = () => {
        if (value > 1){ 
            setValue(value-1);
            onValueChange(value-1);
        }
    }

    return (
        <div className='counter'>
            <BiLeftArrow className='counter-func' onClick={decrease}/>
            <p className='counter-value'>
                {value}
            </p>
            <BiRightArrow className='counter-func' onClick={increase}/>
        </div>
    )
}
