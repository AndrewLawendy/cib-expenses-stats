import React, { useContext } from "react";
import { Link } from "wouter";
import { Button, Header } from "semantic-ui-react";

import styles from "./styles.scss";

import { AppContext } from "../appContext/AppContext.jsx";

import UserModal from "../userModal/UserModal.jsx";

const Nav = () => {
  const { user } = useContext(AppContext);
  return (
    <nav className={styles.nav}>
      <Header className={styles.header}>{user}</Header>
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
        <UserModal />
      </div>
    </nav>
  );
};

export default Nav;
