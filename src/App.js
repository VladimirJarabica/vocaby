// @flow
import * as React from "react";

import Root from "./Root";
import Loader from "./components/Loader";

import { FirebaseConsumer } from "./services/FirebaseContext";

type Props = {
  loading: boolean,
};

const App = (props: Props) => (props.loading ? <Loader /> : <Root />);

export default () => (
  <FirebaseConsumer>{context => <App loading={context.loading} />}</FirebaseConsumer>
);
