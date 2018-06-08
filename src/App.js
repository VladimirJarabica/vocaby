// @flow
import * as React from "react";

import Root from "./Root";
import Loader from "./components/Loader";

import { FirebaseConsumer } from "./services/FirebaseContext";

type Props = {
  auth: Object,
};
type State = {
  loading: boolean,
};

class App extends React.PureComponent<Props, State> {
  state = {
    loading: true,
  };
  constructor(props) {
    super(props);
    props.auth.onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { loading } = this.state;
    console.log("App", this.props, this.state);
    if (loading) return <Loader />;
    return <Root />;
  }
}

export default () => (
  <FirebaseConsumer>{context => <App auth={context.firebase.auth()} />}</FirebaseConsumer>
);
