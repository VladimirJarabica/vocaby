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
    };
    // TODO: development only
    window.firebase = this.state.firebase;
  }

  logout = () => {
    this.state.firebase.auth().signOut();
  }

  render() {
    console.log("FirebaseProvider", this.state);
    // TODO: root ref, auth, user...
    return (
      <FirebaseContext.Provider
        value={{
          firebase: this.state.firebase,
          user: this.state.firebase.auth().currentUser,
        }}
      >
        {this.props.children}
      </FirebaseContext.Provider>
    );
  }
}

export const FirebaseConsumer = FirebaseContext.Consumer;
