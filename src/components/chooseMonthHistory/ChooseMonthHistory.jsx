import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "semantic-ui-react";

import { AppContext } from "../appContext/AppContext.jsx";

const ChooseMonthHistory = ({ userHistory }) => {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear().toString());
  const { setJsonData } = useContext(AppContext);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const yearsOptions = getYears(userHistory);
  const monthsOptions = Array.from({ length: 12 }, (_, i) => ({
    key: months[i],
    text: months[i],
    value: i + 1,
  }));

  function getYears(userHistory) {
    let lastYear = "";
    const differentYears = [];

    for (const key in userHistory) {
      if (userHistory.hasOwnProperty(key)) {
        const [, year] = key.split("-");
        if (lastYear !== year) {
          differentYears.push({
            key: year,
            text: year,
            value: year,
          });
          lastYear = year;
        }
      }
    }

    return differentYears;
  }

  function passMonthData() {
    const key = `${month}-${year}`;
    const { data } = userHistory[key] || { data: [] };

    setJsonData(data);
  }

  useEffect(
    () => () => {
      setJsonData([]);
    },
    []
  );

  return (
    <>
      <Form>
        <Form.Field>
          <Form.Select
            search
            fluid
            label="Month"
            options={monthsOptions}
            value={month}
            onChange={(_, { value }) => {
              setMonth(value);
            }}
          />
        </Form.Field>

        <Form.Field>
          <Form.Select
            search
            fluid
            label="Year"
            options={yearsOptions}
            value={year}
            onChange={(_, { value }) => {
              setYear(value);
            }}
          />
        </Form.Field>
        <Form.Field
          control={Button}
          content="Choose Month"
          primary
          onClick={passMonthData}
        />
      </Form>
    </>
  );
};

export default ChooseMonthHistory;
