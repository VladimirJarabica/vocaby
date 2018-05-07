// @flow
import * as React from "react";
import * as R from "ramda";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";

import { connect } from "../../store";

import Words from "./scenes/Words";
import Navbar from "./components/Navbar";

type Props = {
  selectedStudy: ?string,
  studies: string[],
  rootRef: Object,
  logout: () => void,
  match: Object,
};

class Main extends React.PureComponent<Props> {
  render() {
    const { selectedStudy, words, match, logout } = this.props;
    console.log("match", match);
    return (
      <React.Fragment>
        <Navbar logout={logout} />
        <Route
          path={`${match.url}`}
          component={() =>
            !R.isNil(selectedStudy) ? (
              <Words
                words={words}
                selectedStudy={selectedStudy}
                selectedStudyRef={this.props.rootRef.child("vocabulary").child(selectedStudy)}
              />
            ) : (
              <div>Loading...</div>
            )
          }
        />
        <Route path={`${match.url}/quiz`} exact component={() => <div>quiz</div>} />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  selectedStudy: state.selectedStudy,
  words: state.words,
}))(withRouter(Main));
