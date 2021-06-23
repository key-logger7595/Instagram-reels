import React,{useContext} from 'react'
import { Redirect,Route } from 'react-router';
import {AuthContext} from "../contexts/AuthContext";

export default function PrivateRoute(props) {

    let { currentUser } = useContext(AuthContext);
    
    const Component = props.abc;
    return (
        <Route {...props} render ={(props)=>{
          return (currentUser!=null)? <Component {...props}></Component>:<Redirect to="/login"/>
        }}/>
    )
}
