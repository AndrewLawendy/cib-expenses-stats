import React from "react";
import { Grid, Tab } from "semantic-ui-react";

import JSONDataText from "../jsonDataText/JSONDataText.jsx";
import GetDataForm from "../getDataForm/GetDataForm.jsx";
import UploadStatement from "../uploadStatement/UploadStatement.jsx";
import OneMonthStats from "../oneMonthStats/OneMonthStats.jsx";

const Home = () => {
  const panes = [
    {
      menuItem: "JSON (Credit Only)",
      render: () => (
        <Tab.Pane>
          <Grid>
            <Grid.Column width={12}>
              <JSONDataText />
            </Grid.Column>
            <Grid.Column width={4}>
              <GetDataForm />
            </Grid.Column>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Upload File",
      render: () => (
        <Tab.Pane>
          <UploadStatement />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <Tab panes={panes} />
      <OneMonthStats />
    </>
  );
};

export default Home;
