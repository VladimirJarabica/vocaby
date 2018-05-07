// @flow
import * as React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Home from "./scenes/Home";
import Login from "./scenes/Login";
import App from "./scenes/App";

type Props = {
  user: ?Object,
  firebase: Object,
};

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const Root = ({ user, firebase }: Props) => {
  window.firebase = firebase;
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={() => <Login user={user} auth={firebase.auth()} />} />
        <PrivateRoute
          path="/app"
          user={user}
          component={() => (
            <App
              languagesRef={firebase.database().ref("languages")}
              rootRef={firebase.database().ref(`/users/${user.uid}`)}
              user={user}
              auth={firebase.auth()}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default Root;
