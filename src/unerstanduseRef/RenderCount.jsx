import React,{useState,useEffect,useRef} from 'react'

export default function RenderCount() {
    const[name,setName] = useState('');
    const renderCount = useRef(1);
     

    useEffect(()=>{
        renderCount.current = renderCount.current + 1;
    })
    return (
        <div>
            <input value={name} onChange={e=>setName(e.target.value)}/>
            <div>May name is {name}</div>
            <div>I rendered {renderCount} times</div>
        </div>
    )
}
 