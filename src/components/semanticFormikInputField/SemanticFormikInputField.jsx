import React from "react";
import { Form } from "semantic-ui-react";

import styles from "./styles.scss";

export const SemanticFormikInputField = (props) => {
  const {
    field: {
      // provided by Formik Field
      name,
      value,
    },
    form: {
      // also provided by Formik Field
      setFieldValue,
      setFieldTouched,
      errors,
    },
    label,
    type = "text",
    readOnly,
  } = props;

  return (
    <div className={styles.input + " ui form"}>
      <Form.Input
        error={errors[name] && { content: errors[name], pointing: "below" }}
        fluid
        label={label}
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(event) => {
          setFieldValue(name, event.target.value);
        }}
        onBlur={() => {
          setFieldTouched(name, true);
        }}
      />
    </div>
  );
};
