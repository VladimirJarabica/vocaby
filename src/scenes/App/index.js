// @flow
import * as React from "react";
import * as R from "ramda";

import { FirebaseConsumer } from "../../services/FirebaseContext";

import { StoreProvider, StoreConsumer } from "../../services/StoreContext";

import Main from "./scenes/Main";
import cookies from "js-cookie";

type Props = {
  languagesRef: Object,
  rootRef: Object,
};

class App extends React.PureComponent<Props> {
  componentDidMount() {
    // TODO: move to StoreContext
    const { languagesRef, rootRef, setLanguages, setStudies, setSelectedStudy } = this.props;
    languagesRef.once("value").then(snapshot => {
      R.compose(setLanguages, R.sortBy(R.identity), R.values)(snapshot.val());
    });
    rootRef.child("studies").on("value", snapshot => {
      R.compose(setStudies, R.sortBy(R.identity), R.values)(snapshot.val());
    });

    if (cookies.get("study")) {
      setSelectedStudy(cookies.get("study"));
    }
  }

  render() {
    return <Main />;
  }
}

export default () => (
  <FirebaseConsumer>
    {firebase => (
      <StoreProvider rootRef={firebase.rootRef}>
        <StoreConsumer>
          {store => (
            <App
              // firebase
              languagesRef={firebase.languagesRef}
              rootRef={firebase.rootRef}
              // store
              setLanguages={store.setLanguages}
              setStudies={store.setStudies}
              setSelectedStudy={store.setSelectedStudy}
            />
          )}
        </StoreConsumer>
      </StoreProvider>
    )}
  </FirebaseConsumer>
);
