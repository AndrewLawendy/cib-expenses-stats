import React from "react";
import { Header, Grid } from "semantic-ui-react";

import {
  useCreditExpensesHistory,
  useUser,
} from "../../utils/localStorageHooks.js";

import MonthsLineChart from "../monthsLineChart/MonthsLineChart.jsx";
import ChooseMonthHistory from "../chooseMonthHistory/ChooseMonthHistory.jsx";
import OneMonthStats from "../oneMonthStats/OneMonthStats.jsx";

const ExpensesHistory = () => {
  const [creditExpensesHistory] = useCreditExpensesHistory();
  const [user] = useUser();
  const userHistory = creditExpensesHistory[user];

  return (
    <>
      <Header as="h2">Expenses History</Header>
      <Grid>
        <Grid.Column width={12}>
          <MonthsLineChart userHistory={userHistory} />
        </Grid.Column>
        <Grid.Column width={4}>
          <ChooseMonthHistory userHistory={userHistory} />
        </Grid.Column>
      </Grid>
      <OneMonthStats />
    </>
  );
};

export default ExpensesHistory;
