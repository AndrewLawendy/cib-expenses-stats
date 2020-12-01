import React, { useState, useEffect } from "react";
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
  const userHistory = allUserHistory[type] || {};
  const accountKeys = Object.keys(userHistory);
  const [firstKey] = accountKeys;
  const [accountKey, setAccountKey] = useState(firstKey);
  const accountHistory = userHistory[accountKey];

  useEffect(() => {
    setAccountKey(firstKey);
  }, [firstKey]);

  return (
    <>
      <Header as="h2">Expenses History</Header>
      <Grid>
        <Grid.Column width={12}>
          {accountHistory ? (
            <MonthsLineChart accountHistory={accountHistory} year={year} />
          ) : (
            <Message info>
              <Message.Header>No expenses history found!</Message.Header>
              <p>
                Did you update the history of user {user} for the {type}{" "}
                category?
              </p>
            </Message>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <ChooseMonthHistory
            accountHistory={accountHistory}
            accountKeys={accountKeys}
            formControl={{
              type,
              setType,
              month,
              setMonth,
              year,
              setYear,
              accountKey,
              setAccountKey,
            }}
          />
        </Grid.Column>
      </Grid>
      <OneMonthStats />
    </>
  );
};

export default ExpensesHistory;
