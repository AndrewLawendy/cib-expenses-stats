import React from "react";
import { Grid, Form, TextArea } from "semantic-ui-react";

import styles from "./styles.scss";

import GetDataForm from "../getDataForm/GetDataForm";

const Home = () => {
  return (
    <Grid className={styles.grid}>
      <Grid.Column width={12}>
        <Form>
          <TextArea placeholder="Your credit card JSON" />
        </Form>
      </Grid.Column>
      <Grid.Column width={4}>
        <GetDataForm />
      </Grid.Column>
    </Grid>
  );
};

export default Home;
