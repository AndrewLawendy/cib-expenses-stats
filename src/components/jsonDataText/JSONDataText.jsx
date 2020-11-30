import React, { useState, useEffect, useContext } from "react";
import { Form, TextArea, Header, Button } from "semantic-ui-react";

import { AppContext } from "../appContext/AppContext.jsx";
import UpdateHistory from "../updateHistory/UpdateHistory.jsx";

import styles from "./styles.scss";

const JSONDataText = () => {
  const [jsonInvalid, setJsonInvalid] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const { setMonthData } = useContext(AppContext);

  useEffect(
    () => () => {
      setMonthData({ type: "", jsonData: [] });
    },
    []
  );

  function generateDate() {
    let jsonData = [];
    if (textAreaValue) {
      try {
        jsonData = JSON.parse(textAreaValue);
        setMonthData({ type: "credit", jsonData });
      } catch {
        setJsonInvalid(true);
      }
    } else {
      setMonthData({ type: "credit", jsonData });
    }
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
          <UpdateHistory />
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
            setMonthData({ type: "", jsonData: [] });
          }}
          placeholder="Your credit card JSON"
        />
      </Form>
    </div>
  );
};

export default JSONDataText;
