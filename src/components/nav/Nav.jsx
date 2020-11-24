import React from "react";
import { Link } from "wouter";
import { Button, Header } from "semantic-ui-react";

import styles from "./styles.scss";

import UserModal from "../userModal/UserModal.jsx";
import { useUser } from "../../utils/localStorageHooks.js";

const Nav = () => {
  const [user] = useUser();
  return (
    <nav className={styles.nav}>
      <Header className={styles.header}>{user}</Header>
      <div>
        <Link href="/">
          <Button content="Home" icon="home" labelPosition="left" primary />
        </Link>
        <Link href="expenses-history">
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
