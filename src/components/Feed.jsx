import React,{useContext,useState} from 'react'
import {AuthContext} from '../contexts/AuthContext';

export default function Feed() {
    const[loading,setLoading]=useState(false);
    const {signOut} = useContext(AuthContext);

    const submitHandler = async()=>{

        try {
         setLoading(true);
         await signOut();
        //  setLoading(false); 
        }
        catch(err){
        setLoading(false);
        }
    }

    return (
        <div>
            Feed Page
            <button disabled={loading} onClick={submitHandler}>LogOut</button>
        </div>
    )
}
