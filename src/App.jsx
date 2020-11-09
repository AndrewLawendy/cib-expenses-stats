import React from "react";
import ReactDOM from "react-dom";

import "semantic-ui-css/semantic.min.css";

import Nav from "./components/nav/Nav.jsx";

const App = () => {
  return (
    <React.Fragment>
      <Nav />
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
