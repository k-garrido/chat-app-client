import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import SingInOut from "./views/SingInUp";
import MainChat from "./views/MainChat";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path = "/login" >
            <SingInOut />
          </Route>
          <Route path = "/">
            <MainChat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
