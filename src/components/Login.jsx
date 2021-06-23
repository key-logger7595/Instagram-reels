import React,{useContext,useState} from 'react';
import {AuthContext} from '../contexts/AuthContext';
 const Login = (props)=> {
  let {logIn} = useContext(AuthContext);
   
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[disabled,setDisabled]=useState(false);


  const emailHandler = (e)=>{
        console.log(e.target.value);
       setEmail(e.target.value);              
  }
  const passwordHandler = (e)=>{
     setPassword(e.target.value);
  }

  const submitHandler = async(e) => {
      e.preventDefault();

      try {
          console.log("Am i coming inside try")
          setDisabled(true);

          await logIn(email, password);
          props.history.push("/");
          setDisabled(false);
        }
      catch (err) {
          setDisabled(false);
      }
      setEmail("");
      setPassword("");

  }

    return (
        <div>
             <h1>Firebase Login</h1>
            <input type="email" value={email}
                onChange={emailHandler}></input>
            <input type="password"
                value={password} onChange={passwordHandler} ></input>  
                        
            <input type="button" value="submit" onClick={submitHandler} disabled={disabled}></input>
        </div>
           
    )
}
export default Login;