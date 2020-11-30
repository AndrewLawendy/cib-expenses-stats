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
  const {
    monthData: { type, accountKey, jsonData },
  } = useContext(AppContext);

  function updateHistory() {
    const [, month, year] = jsonData[0].date.split("/");
    const monthHistoryKey = `${month}-${year}`;
    const total = jsonData.reduce((acc, { amount }) => {
      acc += amount;
      return acc;
    }, 0);

    if (!creditExpensesHistory[user]) creditExpensesHistory[user] = {};

    if (!creditExpensesHistory[user][type])
      creditExpensesHistory[user][type] = {};

    if (!creditExpensesHistory[user][type][accountKey])
      creditExpensesHistory[user][type][accountKey] = {};

    if (!creditExpensesHistory[user][type][accountKey])
      creditExpensesHistory[user][type][accountKey] = {};

    creditExpensesHistory[user][type][accountKey][monthHistoryKey] = {
      total,
      data: jsonData,
    };

    setCreditExpensesHistory(creditExpensesHistory);
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
      content={`Storing expenses history to user "${user}" in the ${type} category?`}
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
