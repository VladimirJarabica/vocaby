// @flow
import * as React from "react";
import * as R from "ramda";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";

import { StoreConsumer } from "../../../../services/StoreContext";
import Loader from "../../../../components/Loader";
import Words from "./scenes/Words";
import Navbar from "./components/Navbar";

type Props = {
  selectedStudy: ?string,
  match: Object,
};

class Main extends React.PureComponent<Props> {
  render() {
    const { selectedStudy, match } = this.props;
    return (
      <React.Fragment>
        <Navbar />
        <Route path={`${match.url}`} component={!R.isNil(selectedStudy) ? Words : Loader} />
        <Route path={`${match.url}/quiz`} exact component={() => <div>quiz</div>} />
      </React.Fragment>
    );
  }
}

const Connected = props => (
  <StoreConsumer>
    {store => <Main {...props} selectedStudy={store.state.selectedStudy} />}
  </StoreConsumer>
);

export default withRouter(Connected);
