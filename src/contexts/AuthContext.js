import React,{useEffect,useState} from 'react';
import auth from '../firebase';


export const AuthContext = React.createContext();
export const AuthProvider =(props) => {

    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const logIn = async(email,password)=>{
      return await auth.signInWithEmailAndPassword(email, password);
    }
    const signOut = async() => {
      return await auth.signOut();
    }
    const signUp = async(email,password)=>{
        return await auth.createUserWithEmailAndPassword(email, password);
    }
    const value={
        currentUser,
        logIn,
        signOut,
        signUp
    }
    useEffect(() => {
        // eventListener
        console.log("added event Listener")
        const cleanUp = auth.onAuthStateChanged(user => {
            console.log("user", user);
            setCurrentUser(user);
            setLoading(false)
        })
        return ()=>{
            cleanUp();
        }
       
    }, []);




    
    return (
       <AuthContext.Provider value={value}>
           {!loading &&props.children}
       </AuthContext.Provider>
    )
}
