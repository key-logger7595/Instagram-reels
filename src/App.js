import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Feed from './components/Feed';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Layout from './components/Layout';

import { AuthProvider } from './contexts/AuthContext';



export default function App() {
  return (
    
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <PrivateRoute exact path="/profile" abc={Profile}></PrivateRoute>
            <PrivateRoute exact path="/" abc={Layout}></PrivateRoute>
            

          </Switch>

        </AuthProvider>

      </Router>
        
   
  )
}
// import React,{useState,useEffect,useRef} from 'react';

// export default function RenderCount() {
//     const[name,setName] = useState('');
//     const renderCount = useRef(1);
     

//     useEffect(()=>{
//         renderCount.current = renderCount.current + 1;
//     })

//     return (
//         <div>
//             <input value={name} onChange={e=>setName(e.target.value)}/>
//             <div>May name is {name}</div>
//             <div>I rendered {renderCount.current} times</div>
//         </div>
//     )
// }
 