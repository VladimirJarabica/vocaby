// @flow
import * as React from "react";
import * as R from "ramda";

import { FirebaseConsumer } from "../../services/FirebaseContext";

// import { Provider, actions, subscribe, getState } from "./store";

import { StoreProvider, StoreConsumer } from "../../services/StoreContext";

import Main from "./scenes/Main";
import cookies from "js-cookie";

window.getState = getState;
subscribe((action, state) => console.log(action, state));

type Props = {
  auth: Object,
  languagesRef: Object,
  rootRef: Object,
};

class App extends React.PureComponent<Props> {
  componentDidMount() {
    const { languagesRef, rootRef } = this.props;

    languagesRef.once("value").then(snapshot => {
      R.compose(actions.setLanguages, R.sortBy(R.identity), R.values)(snapshot.val());
    });
    rootRef.child("studies").on("value", snapshot => {
      R.compose(actions.setStudies, R.sortBy(R.identity), R.values)(snapshot.val());
    });

    if (cookies.get("study")) {
      actions.setSelectedStudy({
        selectedStudy: cookies.get("study"),
        vocabularyRef: rootRef.child("vocabulary"),
        setWords: actions.setWords,
      });
    }
  }

  logout = () => {
    this.props.auth.signOut();
  };

  render() {
    console.log("app");
    return <Main />;
  }
}

export default () => (
  <FirebaseConsumer>
    {firebaseContext => (
      <StoreProvider>
        <StoreConsumer>{storeContext => <App />}</StoreConsumer>
      </StoreProvider>
    )}
  </FirebaseConsumer>
);

// {/*{storeContext => {*/}
// {/*// const rootRef = firebaseContext.firebase*/}
// {/*//   .database()*/}
// {/*//   .ref(`/users/${firebaseContext.user.uid}`)}*/}
// {/*return <App />;*/}
// {/*}}*/}
