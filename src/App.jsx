import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SingInOut from "./views/SingInUp";
import MainChat from "./views/MainChat";
import { UserContext } from './UserContext';
import jwt_decode from 'jwt-decode';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#80cbc4'
    }
  },
  typography: {
    fontFamily: [
      "Acme",
    ].join(','),
    h1: {
      lineHeight: "0.7"
    }
  },
});

function App() {
  const token = localStorage.getItem('token');
  let tokenDecoded = {
    name: "",
    email: "",
    uid: ""
  };
  if (token) {
    tokenDecoded = jwt_decode(token);
  }
  const [user, setUser] = useState({
    name: tokenDecoded.name,
    email: tokenDecoded.email,
    id: tokenDecoded.uid
  });
  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
}

export default App;
