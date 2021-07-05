import React,{useState,useEffect} from 'react'

export default function List({getItems}) {

    const [items,setItems] = useState([]);

    useEffect(()=>{
        setItems(getItems())
    },[getItems])
    return (
        <div>
            {items.map(item=>{
                return <div>{item}</div>
            })}
        </div>
    )
}
