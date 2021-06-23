import React,{useEffect,useState} from 'react';
import auth from '../firebase';


export const AuthContext = React.createContext();
export const AuthProvider =(props) => {

    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);

    async function logIn(email,password){
      return await auth.signInWithEmailAndPassword(email, password);
    }
    const signUp = async() => {
      return await auth.signOut();
    }
    const value={
        currentUser,
        logIn,
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
        return()=>{
            cleanUp();
        }
       
    }, []);




    
    return (
       <AuthContext.Provider value={value}>
           {!loading &&props.children}
       </AuthContext.Provider>
    )
}
