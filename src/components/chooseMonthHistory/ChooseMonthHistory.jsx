import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "semantic-ui-react";

import { AppContext } from "../appContext/AppContext.jsx";

const ChooseMonthHistory = ({ userHistory, type, setType }) => {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear().toString());
  const { setMonthData } = useContext(AppContext);

  const typesOptions = [
    {
      key: "credit",
      value: "credit",
      text: "Credit",
    },
    {
      key: "debit",
      value: "debit",
      text: "Debit",
    },
  ];
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
    const uniqueYears = [];

    for (const key in userHistory) {
      if (userHistory.hasOwnProperty(key)) {
        const [, year] = key.split("-");
        if (!uniqueYears.some(({ value }) => value === year)) {
          uniqueYears.push({
            key: year,
            text: year,
            value: year,
          });
        }
      }
    }

    return uniqueYears.sort(
      ({ value: valueA }, { value: valueB }) => valueA - valueB
    );
  }

  function passMonthData() {
    const key = `${month}-${year}`;
    const { data } = userHistory[key] || { data: [] };

    setMonthData({ type, jsonData: data });
  }

  useEffect(
    () => () => {
      setMonthData({ type: "", jsonData: [] });
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
            label="Expenses Type"
            options={typesOptions}
            value={type}
            onChange={(_, { value }) => {
              setType(value);
            }}
          />
        </Form.Field>

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
