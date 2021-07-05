import React,{useState,useEffect,useRef} from 'react'

export default function PersistPrevState() {
    const[name,setName] = useState('');
    const prevName = useRef('');

    useEffect(()=>{
      prevName.current = name;
    },[name])
    return (
        <div>
          <input value={name} onChange={e=>setName(e.target.value)}/>
          <div>May name is {name} and earlier it used to be {prevName} </div>
            
        </div>
    )
}
