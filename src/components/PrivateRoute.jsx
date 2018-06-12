// @flow
import * as React from "react";
import { Route, Redirect } from "react-router-dom";

import { FirebaseConsumer } from "../services/FirebaseContext";

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <FirebaseConsumer>
    {context => (
      <Route
        {...rest}
        render={props =>
          context.user ? (
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
    )}
  </FirebaseConsumer>
);

export default PrivateRoute;
