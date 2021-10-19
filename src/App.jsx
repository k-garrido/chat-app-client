import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import SingInOut from "./views/SingInUp";
import MainChat from "./views/MainChat";
import { UserContext } from './UserContext';
import jwt_decode from 'jwt-decode';

function App() {
  const token = localStorage.getItem('token')
  const tokenDecoded = jwt_decode(token);
  const [user, setUser] = useState({
    name: tokenDecoded.name,
    email: tokenDecoded.email,
    id: tokenDecoded.uid
  })
  return (
    <Router>
      <div>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route path = "/chat/:room_id/:room_name">
              <MainChat />
            </Route>
            <Route path = "/" >
              <SingInOut />
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
