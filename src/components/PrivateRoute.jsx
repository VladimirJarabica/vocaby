// @flow
import * as React from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthConsumer } from "../services/AuthContext";

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <AuthConsumer>
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
  </AuthConsumer>
);

export default PrivateRoute;
