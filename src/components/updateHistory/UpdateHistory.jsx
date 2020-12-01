import React, { useContext } from "react";
import { Modal, Button } from "semantic-ui-react";

import {
  useCibExpensesHistory,
  useUser,
} from "../../utils/localStorageHooks.js";
import { AppContext } from "../appContext/AppContext.jsx";

const UpdateHistory = () => {
  const [cibExpensesHistory, setCibExpensesHistory] = useCibExpensesHistory();
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

    if (!cibExpensesHistory[user]) cibExpensesHistory[user] = {};

    if (!cibExpensesHistory[user][type]) cibExpensesHistory[user][type] = {};

    if (!cibExpensesHistory[user][type][accountKey])
      cibExpensesHistory[user][type][accountKey] = {};

    if (!cibExpensesHistory[user][type][accountKey])
      cibExpensesHistory[user][type][accountKey] = {};

    cibExpensesHistory[user][type][accountKey][monthHistoryKey] = {
      total,
      data: jsonData,
    };

    setCibExpensesHistory(cibExpensesHistory);
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
