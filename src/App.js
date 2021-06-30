import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Feed from './components/Feed';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import SignUp from './components/SignUp';

import { AuthProvider } from './contexts/AuthContext';
export default function App() {
  return (
    
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <PrivateRoute exact path="/profile" abc={Profile}></PrivateRoute>
            <PrivateRoute exact path="/" abc={Feed}></PrivateRoute>
            

          </Switch>

        </AuthProvider>

      </Router>
        
   
  )
}
