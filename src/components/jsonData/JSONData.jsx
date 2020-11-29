import React from "react";
import { Grid } from "semantic-ui-react";

import JSONDataText from "../jsonDataText/JSONDataText.jsx";
import GetDataForm from "../getDataForm/GetDataForm.jsx";

const JSONData = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <JSONDataText />
      </Grid.Column>
      <Grid.Column width={4}>
        <GetDataForm />
      </Grid.Column>
    </Grid>
  );
};

export default JSONData;
