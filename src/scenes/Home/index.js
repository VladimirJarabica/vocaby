// @flow
import * as React from "react";
import { Link } from "react-router-dom"

type Props = {
  loggedIn: boolean,
};

const Home = ({loggedIn}: Props) => {
  return <div>{
    loggedIn ? <Link to="/app">App</Link> : <Link to="/login">Login</Link>
  }</div>;
};

export default Home;
