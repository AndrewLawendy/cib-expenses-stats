import React, { useState, useEffect, useContext } from "react";
import { Form, TextArea, Header, Button, Modal } from "semantic-ui-react";

import { AppContext } from "../appContext/AppContext.jsx";
import {
  useCreditExpensesHistory,
  useUser,
} from "../../utils/localStorageHooks.js";

import styles from "./styles.scss";

const JSONDataText = () => {
  const [jsonInvalid, setJsonInvalid] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [
    creditExpensesHistory,
    setCreditExpensesHistory,
  ] = useCreditExpensesHistory();
  const [user] = useUser();
  const { jsonData, setJsonData } = useContext(AppContext);

  useEffect(
    () => () => {
      setJsonData([]);
    },
    []
  );

  function generateDate() {
    let jsonData = [];
    if (textAreaValue) {
      try {
        jsonData = JSON.parse(textAreaValue);
        setJsonData(jsonData);
      } catch {
        setJsonInvalid(true);
      }
    } else {
      setJsonData(jsonData);
    }
  }

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
    <div className={styles.jsonDataText}>
      <div className={styles.header}>
        <Header as="h2">JSON Data</Header>
        <div>
          <Button
            color="green"
            onClick={generateDate}
            disabled={!textAreaValue}
          >
            Generate Data
          </Button>
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
        </div>
      </div>
      <Form>
        <Form.Field
          value={textAreaValue}
          error={jsonInvalid && { content: "This is not a valid JSON format" }}
          control={TextArea}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
            setJsonInvalid(false);
            setJsonData([]);
          }}
          placeholder="Your credit card JSON"
        />
      </Form>
    </div>
  );
};

export default JSONDataText;
