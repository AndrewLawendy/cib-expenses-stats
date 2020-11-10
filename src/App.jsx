import React from "react";
import ReactDOM from "react-dom";
import { Route } from "wouter";

import "semantic-ui-css/semantic.min.css";
import styles from "./index.scss";

import Nav from "./components/nav/Nav.jsx";
import Home from "./components/home/Home.jsx";
import Stats from "./components/stats/Stats.jsx";

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Nav />

      <div className={styles.body}>
        <Route path="/" component={Home} />
        <Route path="/stats" component={Stats} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
