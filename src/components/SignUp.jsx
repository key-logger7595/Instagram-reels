import React, { useContext, useState } from 'react';
import {AuthContext} from '../contexts/AuthContext';

import { storage,database } from "../firebase";

export default function SignUp(props) {
    const[userName,setUserName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const[file,setFile] = useState(null);
    const[error,setError] = useState(false);
    const[loader,setLoader] = useState(false);
    
    let {signUp} = useContext(AuthContext);

    const handleFileSubmit = (e)=> {
       let file = e?.target?.files[0];
       if(file != null){
          console.log(e.target.files[0]);
          setFile(e.target.files[0])
       }    
    }  

    const handleSignup = async(e)=>{
        e.preventDefault();
        try {

            setLoader(true);
            // 1
            let res = await signUp(email, password);
            let uid = res.user.uid;
            const uploadTaskListener = storage
            .ref(`/users/${uid}/profileImage`).put(file);
            // fn1 -> progress
            // fn2 -> error 
            // fn3-> success
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            }
            function fn2(error) {
                setError(error);
                setLoader(false);
            }
            async function fn3() {
                // link get 
                let downloadurl = await
                    uploadTaskListener.snapshot.ref.getDownloadURL();
                database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username:userName,
                    createdAt: database.getUserTimeStamp(),
                    profileUrl: downloadurl
                })
                setLoader(false);
                props.history.push("/")
            }


        } catch (err) {
            setError("");
            setLoader(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="">UserName</label>
                    <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="">Profile Image</label>
                    <input type="file" accept="image/*" onChange={handleFileSubmit}/>
                </div>
                <button type="submit" disabled={loader}>login</button>
            </form>
        </div>
    )
}
