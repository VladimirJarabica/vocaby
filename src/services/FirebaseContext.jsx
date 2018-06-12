// @flow
import * as React from "react";
import * as firebase from "firebase";
import config from "../../config";

const FirebaseContext = React.createContext();

export class FirebaseProvider extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      firebase: firebase.initializeApp(config),
      user: null,
      rootRef: null,
      loading: true,
    };
    // TODO: development only
    window.firebase = this.state.firebase;
    const db = firebase.database();
    this.state.firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user, this.state);
      this.setState({
        user,
        loading: false,
        rootRef: user ? db.ref(`users/${user.uid}`) : null,
      });
    });

    this.languagesRef = db.ref("languages");
  }

  logout = () => {
    this.state.firebase.auth().signOut();
  };

  loginGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    this.state.firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("auth succeeded", token, user);
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

  logout = () => {
    this.state.firebase.auth().signOut();
  };

  render() {
    console.log("FirebaseProvider", this.state);
    // TODO: root ref, auth, user...
    return (
      <FirebaseContext.Provider
        value={{
          firebase: this.state.firebase,
          user: this.state.user,
          loading: this.state.loading,
          logout: this.logout,
          loginGoogle: this.loginGoogle,
          rootRef: this.state.rootRef,
          languagesRef: this.languagesRef,
        }}
      >
        {this.props.children}
      </FirebaseContext.Provider>
    );
  }
}

export const FirebaseConsumer = FirebaseContext.Consumer;
