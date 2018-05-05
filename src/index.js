// @flow
import * as React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as firebase from "firebase";
import config from "../config";

firebase.initializeApp(config);

ReactDOM.render(<App firebase={firebase} />, document.getElementById("app"));
