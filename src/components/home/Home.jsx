import React from "react";
import { Grid } from "semantic-ui-react";

import styles from "./styles.scss";

import GetDataForm from "../getDataForm/GetDataForm";

const Home = () => {
  // const copyToClipboard = str => {
  //   const el = document.createElement('textarea');
  //   el.value = str;
  //   el.setAttribute('readonly', '');
  //   el.style.position = 'fixed';
  //   el.style.left = '100%';
  //   document.body.appendChild(el);
  //   el.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(el);
  // };

  return (
    <Grid className={styles.grid}>
      <Grid.Column width={12}>
        <iframe
          className={styles.iframeWindow}
          title="CIB Internet Banking Window"
          src="https://ebanking.cibeg.com/CIBInternet"
        ></iframe>
      </Grid.Column>
      <Grid.Column width={4}>
        <GetDataForm />
      </Grid.Column>
    </Grid>
  );
};

export default Home;
