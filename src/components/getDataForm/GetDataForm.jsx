import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";

import { SemanticFormikInputField } from "../semanticFormikInputField/SemanticFormikInputField.jsx";

const validationScheme = Yup.object().shape({
  month: Yup.number().min(1).max(12).required("Month is required"),
  year: Yup.number().min(1990).max(2120).required("Year field is required"),
});

const initialValues = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

const GetDataForm = () => {
  const onSubmit = () => {
    console.log("submited");
  };

  return (
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
            component={SemanticFormikInputField}
          />

          <Field
            name="year"
            label="Year"
            type="number"
            component={SemanticFormikInputField}
          />

          <Button type="submit" disabled={!isValid} primary>
            Get Data
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default GetDataForm;
