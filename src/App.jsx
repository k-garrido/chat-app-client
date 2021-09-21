import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Login from './views/SignIn'
import SingInOut from "./views/SingInOut";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path = "/login" >
            <SingInOut />
          </Route>
          <Route exact path = "/">
            Pagina de chat
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
