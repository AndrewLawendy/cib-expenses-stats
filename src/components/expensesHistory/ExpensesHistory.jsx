import React, { useState } from "react";
import { Header, Grid, Message } from "semantic-ui-react";

import {
  useCreditExpensesHistory,
  useUser,
} from "../../utils/localStorageHooks.js";

import MonthsLineChart from "../monthsLineChart/MonthsLineChart.jsx";
import ChooseMonthHistory from "../chooseMonthHistory/ChooseMonthHistory.jsx";
import OneMonthStats from "../oneMonthStats/OneMonthStats.jsx";

const ExpensesHistory = () => {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear().toString());
  const [type, setType] = useState("credit");

  const [creditExpensesHistory] = useCreditExpensesHistory();
  const [user] = useUser();
  const allUserHistory = creditExpensesHistory[user] || {};
  const userHistory = allUserHistory[type];

  return (
    <>
      <Header as="h2">Expenses History</Header>
      {userHistory ? (
        <>
          <Grid>
            <Grid.Column width={12}>
              <MonthsLineChart userHistory={userHistory} year={year} />
            </Grid.Column>
            <Grid.Column width={4}>
              <ChooseMonthHistory
                userHistory={userHistory}
                formControl={{ type, setType, month, setMonth, year, setYear }}
              />
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
