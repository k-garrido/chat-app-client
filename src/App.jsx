import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import SingInOut from "./views/SingInUp";
import MainChat from "./views/MainChat";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path = "/chat/:room_id/:room_name">
            <MainChat />
          </Route>
          <Route path = "/" >
            <SingInOut />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
