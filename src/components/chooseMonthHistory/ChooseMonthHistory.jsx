import React, { useEffect, useContext } from "react";
import { Form, Button } from "semantic-ui-react";

import { AppContext } from "../appContext/AppContext.jsx";

const ChooseMonthHistory = ({
  accountHistory,
  accountKeys,
  formControl: {
    type,
    setType,
    month,
    setMonth,
    year,
    setYear,
    accountKey,
    setAccountKey,
  },
}) => {
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
  const yearsOptions = getYears(accountHistory);
  const monthsOptions = Array.from({ length: 12 }, (_, i) => ({
    key: months[i],
    text: months[i],
    value: i + 1,
  }));
  const accountKeysOptions = accountKeys.map((key) => ({
    key,
    text: key,
    value: key,
  }));

  function getYears(history) {
    const uniqueYears = [];

    for (const key in history) {
      if (history.hasOwnProperty(key)) {
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
    const { data } = accountHistory[key] || { data: [] };

    setMonthData({ type, accountKey, jsonData: data });
  }

  useEffect(
    () => () => {
      setMonthData({ type: "", accountKey: "", jsonData: [] });
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
              setMonthData({ type: "", accountKey: "", jsonData: [] });
            }}
          />
        </Form.Field>

        {accountHistory && (
          <>
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

            <Form.Field>
              <Form.Select
                search
                fluid
                label={type === "credit" ? "Card Numbers" : "Account Numbers"}
                options={accountKeysOptions}
                value={accountKey}
                onChange={(_, { value }) => {
                  setAccountKey(value);
                }}
              />
            </Form.Field>

            <Form.Field
              control={Button}
              content="Choose Month"
              primary
              onClick={passMonthData}
            />
          </>
        )}
      </Form>
    </>
  );
};

export default ChooseMonthHistory;
