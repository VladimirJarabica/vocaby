// @flow
import * as React from "react";

type Props = {
  auth: Object
};

class App extends React.PureComponent<Props> {
  logout = () => {
    this.props.auth.signOut();
  };

  render() {
    return (
      <div>
        App
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default App;
