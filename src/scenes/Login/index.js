// @flow
import * as React from "react";
import { Redirect } from "react-router-dom";

import { FirebaseConsumer } from "../../services/FirebaseContext";

type Props = {
  user: Object,
  loginGoogle: () => void,
};

const Login = (props: Props) => {
  if (props.user) {
    return <Redirect to="/app" />;
  }
  return (
    <div>
      login
      <button onClick={props.loginGoogle}>Google login</button>
    </div>
  );
};

export default () => (
  <FirebaseConsumer>
    {firebaseContext => (
      <Login user={firebaseContext.user} loginGoogle={firebaseContext.loginGoogle} />
    )}
  </FirebaseConsumer>
);
