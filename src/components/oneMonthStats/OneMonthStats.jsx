import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { AppContext } from "../appContext/AppContext.jsx";

import ExpensesTable from "../expensesTable/ExpensesTable.jsx";
import ExpensesPieChart from "../expensesPieChart/ExpensesPieChart.jsx";
import ExpensesLineChart from "../expensesLineChart/ExpensesLineChart.jsx";

const OneMonthStats = () => {
  const {
    monthData: { jsonData },
  } = useContext(AppContext);

  return (
    jsonData.length > 0 && (
      <Grid>
        <Grid.Column width={8}>
          <ExpensesTable />
        </Grid.Column>
        <Grid.Column width={8}>
          <ExpensesPieChart />
        </Grid.Column>
        <ExpensesLineChart />
      </Grid>
    )
  );
};

export default OneMonthStats;
