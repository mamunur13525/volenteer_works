import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Register from './components/Register/Register'

import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Allregister from './components/Allregister/Allregister';


export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UserContext.Provider value={ [loggedInUser, setLoggedInUser] }>
  
      <Router>

        <Switch> 

          <Route path="/home">
            <Header></Header>
            <Home />
          </Route>
          <Route exact path="/">
            <Header></Header>
          
            <Home />
          </Route>

          <Route path="/login">
            
            <Login></Login>
          </Route>
          <Route path="/allregister">
              <Allregister></Allregister>
            </Route>

          <PrivateRoute path="/register">
              <Register></Register>
          </PrivateRoute>  

          

        

          <Route  path="*">
                <h1>PAGE NOT FOUND!!</h1>
          </Route>

        </Switch>
   
    </Router>
  </UserContext.Provider>
  );
}

export default App;
