import React, { useState } from "react";
import { Form, TextArea, Header, Button } from "semantic-ui-react";

import styles from "./styles.scss";

const JSONDataText = () => {
  const [jsonData, setJsonData] = useState(null);

  return (
    <div className={styles.jsonDataText}>
      <div className={styles.header}>
        <Header as="h2">JSON Data</Header>
        <div>
          <Button color="green">Generate Table</Button>
          <Button color="teal">Update History</Button>
        </div>
      </div>
      <Form>
        <TextArea
          onChange={(e) => {
            const parsedJSON = JSON.parse(e.target.value);
            setJsonData(parsedJSON);
          }}
          placeholder="Your credit card JSON"
        />
      </Form>
    </div>
  );
};

export default JSONDataText;
