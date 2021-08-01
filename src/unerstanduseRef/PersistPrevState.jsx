import React,{useState,useEffect,useRef} from 'react'

export default function PersistPrevState() {
    const[name,setName] = useState('');
    // const prevName = useRef('');

    useEffect(()=>{
      // prevName.current = name;

      console.log("useEffect runs");
    },[name])
    return (
        <div>
          <input value={name} onChange={e=>setName(e.target.value)}/>
          {/* <div>May name is {name} and earlier it used to be {prevName.current} </div> */}
           <div> {console.log("render runs")} </div> 
        </div>
    )
}
