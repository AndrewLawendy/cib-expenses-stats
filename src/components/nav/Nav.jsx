import React from "react";
import { Link } from "wouter";
import { Button } from "semantic-ui-react";

import styles from "./styles.scss";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div>Andrew</div>
      <div>
        <Link href="/">
          <Button content="Home" icon="home" labelPosition="left" primary />
        </Link>
        <Link href="stats">
          <Button
            content="Expenses History"
            icon="chart line"
            labelPosition="left"
            color="green"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
