import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import SingInOut from "./views/SingInOut";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path = "/login" >
            <SingInOut />
          </Route>
          <Route path = "/">
            Pagina principal
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
