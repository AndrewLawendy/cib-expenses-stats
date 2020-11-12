import React from "react";
import { Grid } from "semantic-ui-react";

import JSONDataText from "../jsonDataText/JSONDataText";
import GetDataForm from "../getDataForm/GetDataForm";
import ExpensesTable from "../expensesTable/ExpensesTable";

const Home = () => {
  return (
    <>
      <Grid>
        <Grid.Column width={12}>
          <JSONDataText />
        </Grid.Column>
        <Grid.Column width={4}>
          <GetDataForm />
        </Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column width={8}>
          <ExpensesTable />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Home;
