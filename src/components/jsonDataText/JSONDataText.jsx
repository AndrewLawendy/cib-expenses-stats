import React, { useState, useContext } from "react";
import { Form, TextArea, Header, Button } from "semantic-ui-react";

import { AppContext } from "../appContext/AppContext.jsx";

import styles from "./styles.scss";

const JSONDataText = () => {
  const [jsonInvalid, setJsonInvalid] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const { setJsonData } = useContext(AppContext);

  return (
    <div className={styles.jsonDataText}>
      <div className={styles.header}>
        <Header as="h2">JSON Data</Header>
        <div>
          <Button
            color="green"
            onClick={() => {
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
            }}
          >
            Generate Table
          </Button>
          <Button color="teal">Update History</Button>
        </div>
      </div>
      <Form>
        <Form.Field
          value={textAreaValue}
          error={jsonInvalid && { content: "This is not a valid JSON format" }}
          control={TextArea}
          onChange={(e) => {
            setJsonInvalid(false);
            setTextAreaValue(e.target.value);
          }}
          placeholder="Your credit card JSON"
        />
      </Form>
    </div>
  );
};

export default JSONDataText;
