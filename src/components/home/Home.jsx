import React from "react";
import { Grid } from "semantic-ui-react";

import styles from "./styles.scss";

import JSONDataText from "../jsonDataText/JSONDataText";
import GetDataForm from "../getDataForm/GetDataForm";

const Home = () => {
  return (
    <Grid className={styles.grid}>
      <Grid.Column width={12}>
        <JSONDataText />
      </Grid.Column>
      <Grid.Column width={4}>
        <GetDataForm />
      </Grid.Column>
    </Grid>
  );
};

export default Home;
