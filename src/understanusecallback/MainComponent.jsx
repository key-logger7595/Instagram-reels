import React,{useState,useCallback} from 'react';
import List from './List';

export default function MainComponent() {

    const[number,setNumber] = useState(1);
    const[dark,setDark] = useState(false);
    
    //this function here Recreate everytime  MainCOmponent is rendered
    // so it passed a s new props to List Component
    // and the useEffect of that will run again as 
    // getItems is its dependancy

    // const getItems = ()=>{
    //     return [number,number+1,number+2]
    // }
    
    // solution is to use useCallback
    //now it will only get recreated when the dependancy 
    //of useCallback changes
    
    const getItems = useCallback(()=>{
        console.log("hey how many times i a m running");
        return [number,number+1,number+2]
    },[number]) 

    const theme ={
        backgroundColor: dark?'#333':'#fff',
        color:dark?'#fff':'#333'
    } 
    return (
        <div style = {theme}>
            <input value={number} onChange={e=>setNumber(parseInt(e.target.value))}/>
            <button 
             onClick={()=>setDark(prevState=>!prevState)}
            >Toggle me</button>
            <List getItems={getItems}/>
        </div>
    )
}
