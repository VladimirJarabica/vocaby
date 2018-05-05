// @flow
import * as React from "react";
import * as firebase from "firebase";
import { Redirect } from "react-router-dom"
// import { Lik } from "react-router-dom"

type Props = {
  auth: Object,
  user: Object
};

class Login extends React.PureComponent<Props> {
  handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    this.props.auth
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("auth succeeded", token, user);
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log("error", error);
      });
  };

  render() {
    console.log("auth login", this.props.auth);

    if(this.props.user) {
      return <Redirect to="/app"/>
    }
    return (
      <div>
        login
        <button onClick={this.handleGoogleLogin}>Google login</button>
      </div>
    );
  }
}

export default Login;
