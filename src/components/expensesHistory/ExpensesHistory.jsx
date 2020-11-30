import React from "react";
import { Header, Grid, Message } from "semantic-ui-react";

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
      {userHistory ? (
        <>
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
      ) : (
        <Message info>
          <Message.Header>No expenses history found!</Message.Header>
          <p>Did you update the history for user {user}?</p>
        </Message>
      )}
    </>
  );
};

export default ExpensesHistory;
