import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Header, Label, Transition } from "semantic-ui-react";

import { SemanticFormikInputField } from "../semanticFormikInputField/SemanticFormikInputField.jsx";

import { copyToClipboard, getDataFunction } from "../../utils";

import styles from "./styles.scss";

const validationScheme = Yup.object().shape({
  month: Yup.number().min(1).max(12).required("Month is required"),
  year: Yup.number().min(1990).max(2120).required("Year field is required"),
});

const initialValues = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

const GetDataForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const showCopySuccess = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const onSubmit = ({ month, year }) => {
    const functionString = getDataFunction(month, year);
    copyToClipboard(functionString);
    showCopySuccess();
  };

  return (
    <>
      <Header as="h2">Get Function Form</Header>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationScheme}
        onSubmit={onSubmit}
      >
        {({ isValid }) => (
          <Form>
            <Field
              name="month"
              label="Month"
              type="number"
              min="1"
              max="12"
              component={SemanticFormikInputField}
            />

            <Field
              name="year"
              label="Year"
              type="number"
              min="1990"
              max="2120"
              component={SemanticFormikInputField}
            />
            <div className={styles.buttonWrapper}>
              <Button type="submit" disabled={!isValid} primary>
                Get Function
              </Button>
              <Transition.Group animation="fade down" duration={500}>
                {showSuccess && (
                  <Label
                    pointing="left"
                    color="green"
                    className={styles.successMessage}
                  >
                    <p>Function copied successfully</p>
                    <p>Please paste it in the CIB console tab</p>
                  </Label>
                )}
              </Transition.Group>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GetDataForm;
