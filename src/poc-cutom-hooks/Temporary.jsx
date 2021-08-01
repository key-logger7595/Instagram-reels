//In this POC we are trying to understand
// custom hook by storing the state in local
// Storage

import React from 'react'
import useLocalStorage from './useLocalStorage'
import useUpdateLogger from './useUpdateLogger';

export default function Temporary() {

    const[name,setName] = useLocalStorage('name','');
    useUpdateLogger(name);

    return (
        <div>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/> 
            <div>
                My Name is {name} 
            </div>
        </div>
    )
}
