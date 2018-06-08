// @flow
import * as React from "react";

const AuthContext = React.createContext();

export class AuthProvider extends React.PureComponent {
  state = {
    user: null,
  };

  setUser = user => {
    this.setState({
      user,
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          user: this.state.user,
          setUser: this.setUser,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
