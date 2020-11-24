import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";

import { AppContext } from "../appContext/AppContext.jsx";

import JSONDataText from "../jsonDataText/JSONDataText.jsx";
import GetDataForm from "../getDataForm/GetDataForm.jsx";
import ExpensesTable from "../expensesTable/ExpensesTable.jsx";
import ExpensesPieChart from "../expensesPieChart/ExpensesPieChart.jsx";

const Home = () => {
  const { jsonData } = useContext(AppContext);
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

      {jsonData.length > 0 && (
        <Grid>
          <Grid.Column width={8}>
            <ExpensesTable />
          </Grid.Column>
          <Grid.Column width={8}>
            <ExpensesPieChart />
          </Grid.Column>
        </Grid>
      )}
    </>
  );
};

export default Home;
