import React, { useContext } from "react";
import { Modal, Button } from "semantic-ui-react";

import {
  useCreditExpensesHistory,
  useUser,
} from "../../utils/localStorageHooks.js";
import { AppContext } from "../appContext/AppContext.jsx";

const UpdateHistory = () => {
  const [
    creditExpensesHistory,
    setCreditExpensesHistory,
  ] = useCreditExpensesHistory();
  const [user] = useUser();
  const { jsonData } = useContext(AppContext);

  function updateHistory() {
    const userHistory = creditExpensesHistory[user] || {};
    const [, month, year] = jsonData[0].date.split("/");
    const monthHistoryKey = `${month}-${year}`;
    const total = jsonData.reduce((acc, { amount }) => {
      acc += amount;
      return acc;
    }, 0);

    setCreditExpensesHistory({
      ...creditExpensesHistory,
      [user]: {
        ...userHistory,
        [monthHistoryKey]: { total, data: jsonData },
      },
    });
  }

  return (
    <Modal
      trigger={
        <Button color="teal" disabled={jsonData.length === 0}>
          Update History
        </Button>
      }
      dimmer="blurring"
      header="Are you sure?"
      content={`Storing expenses history to user "${user}"?`}
      actions={[
        "No",
        {
          key: "yes",
          content: "Yes",
          positive: true,
          onClick: updateHistory,
        },
      ]}
    />
  );
};

export default UpdateHistory;
