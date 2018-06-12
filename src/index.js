// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import config from "../config";

import App from "./App";
import { FirebaseProvider } from "./services/FirebaseContext";

ReactDOM.render(
  <FirebaseProvider config={config}>
    <App />
  </FirebaseProvider>,
  document.getElementById("app"),
);
