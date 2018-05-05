// @flow
import * as React from "react";

import Root from "./Root"
import Loader from "./components/Loader";

type Props = {
  firebase: Object,
};
type State = {
  user: ?Object,
  loading: boolean
};

class App extends React.PureComponent<Props, State> {
  state = {
    user: null,
    loading: true
  };
  constructor(props) {
    super(props);
    props.firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user)
      this.setState({
        loading: false,
        user
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    if (loading) return <Loader />;
    return <Root firebase={this.props.firebase} user={user} />;
  }
}

export default App;
