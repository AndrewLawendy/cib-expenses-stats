import React from "react";
import { Header, Grid } from "semantic-ui-react";

import MonthsLineChart from "../monthsLineChart/MonthsLineChart.jsx";
import OneMonthStats from "../oneMonthStats/OneMonthStats.jsx";

const ExpensesHistory = () => {
  return (
    <>
      <Header as="h2">Expenses History</Header>
      <Grid>
        <Grid.Column width={12}>
          <MonthsLineChart />
        </Grid.Column>
        <Grid.Column width={4}>Months</Grid.Column>
      </Grid>
      <OneMonthStats />
    </>
  );
};

export default ExpensesHistory;
