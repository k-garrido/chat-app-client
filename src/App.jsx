import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Login from './views/Login'

function App() {
  return (
    <Router>
      <div>
        <Button>prueba</Button>
        <Switch>
          <Route path = "/login" >
            <Login />
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
