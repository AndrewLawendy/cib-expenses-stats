import React, { useContext, useState } from "react";
import { Table } from "semantic-ui-react";

import { AppContext } from "../appContext/AppContext";

const ExpensesTable = () => {
  const { jsonData } = useContext(AppContext);
  const [sortingDirection, setSortingDirection] = useState(null);
  const [sortedData, setSortedData] = useState(jsonData);
  const getSortingDirection = sortingDirection
    ? sortingDirection === "asc"
      ? "ascending"
      : "descending"
    : null;
  const totalAmount = jsonData.reduce((total, { amount }) => {
    total += amount;
    return total;
  }, 0);

  function sort() {
    let sorted = [];
    if (!sortingDirection || sortingDirection === "asc") {
      setSortingDirection("desc");
      sorted = sortedData.sort(
        ({ amount: amountA }, { amount: amountB }) => amountB - amountA
      );
    } else {
      setSortingDirection("asc");
      sorted = sortedData.sort(
        ({ amount: amountA }, { amount: amountB }) => amountA - amountB
      );
    }
    setSortedData(sorted);
  }

  return (
    sortedData.length > 0 && (
      <Table sortable celled selectable striped fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell sorted={getSortingDirection} onClick={sort}>
              Amount
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedData.map(({ date, description, amount }, index) => (
            <Table.Row key={`${description}-${index}`}>
              <Table.Cell>{date}</Table.Cell>
              <Table.Cell>{description}</Table.Cell>
              <Table.Cell>{amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Total Amount</Table.HeaderCell>
            <Table.HeaderCell>{totalAmount}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  );
};

export default ExpensesTable;
