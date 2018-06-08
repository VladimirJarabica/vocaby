// @flow
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import App from "./scenes/App";

const Root = () => (
  <Router>
    <Switch>
      {/*<Route exact path="/" component={Home} />*/}
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" component={App} />
    </Switch>
  </Router>
);

export default Root;
