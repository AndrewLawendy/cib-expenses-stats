import React, { useContext, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { Header, Statistic } from "semantic-ui-react";

import styles from "./styles.scss";

am4core.useTheme(am4themes_animated);

import { AppContext } from "../appContext/AppContext.jsx";

const ExpensesLineChart = () => {
  const { jsonData } = useContext(AppContext);
  const [firstRecord] = jsonData;
  const [, month, year] = firstRecord.date.split("/");
  const lastDay = new Date(year, month, 0).getDate();

  const summedData = jsonData.reduce((acc, { date, description, amount }) => {
    if (!acc[date]) acc[date] = { amount: 0, description: "" };
    acc[date].amount += amount;
    acc[date].description += `${description} - "${amount} EGP"\n`;

    return acc;
  }, {});

  const chartData = Array.from({ length: lastDay }, (_, index) => {
    const day = (index + 1).toString().padStart(2, "0");
    const stringDate = `${day}/${month}/${year}`;
    const summedDataValue = summedData[stringDate] || {
      amount: 0,
      description: "No payment that day\n",
    };
    const { amount, description } = summedDataValue;
    const date = new Date(`${month}/${day}/${year}`);

    return { date, amount, description };
  });

  const daysExpensesSummary = chartData.reduce(
    (acc, { amount }) => {
      if (amount == 0) {
        acc.noExpensesDays++;
      } else if (amount <= 50) {
        acc.daysUnderFifty++;
      } else if (amount <= 200) {
        acc.daysUnderTwoHundreds++;
      } else {
        acc.daysOverTwoHundreds++;
      }

      return acc;
    },
    {
      noExpensesDays: 0,
      daysUnderFifty: 0,
      daysUnderTwoHundreds: 0,
      daysOverTwoHundreds: 0,
    }
  );

  useLayoutEffect(() => {
    const chart = am4core.create("lineChartDiv", am4charts.XYChart);

    chart.data = chartData;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "amount";
    series.dataFields.dateX = "date";
    series.tooltipText = "{description}\n{amount} EGP";

    series.tooltip.pointerOrientation = "vertical";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();

    return () => {
      chart.dispose();
    };
  }, [jsonData]);

  return (
    <>
      <div className={styles.summary}>
        <Header as="h3">Expenses Summary</Header>
        <Statistic.Group>
          <Statistic color="green">
            <Statistic.Label>No Expenses Days</Statistic.Label>
            <Statistic.Value>
              {daysExpensesSummary.noExpensesDays}
            </Statistic.Value>
          </Statistic>

          <Statistic color="olive">
            <Statistic.Label>Days Under 50</Statistic.Label>
            <Statistic.Value>
              {daysExpensesSummary.daysUnderFifty}
            </Statistic.Value>
          </Statistic>

          <Statistic color="orange">
            <Statistic.Label>Days under 200</Statistic.Label>
            <Statistic.Value>
              {daysExpensesSummary.daysUnderTwoHundreds}
            </Statistic.Value>
          </Statistic>

          <Statistic color="red">
            <Statistic.Label>Days over 200</Statistic.Label>
            <Statistic.Value>
              {daysExpensesSummary.daysOverTwoHundreds}
            </Statistic.Value>
          </Statistic>
        </Statistic.Group>
      </div>
      <div id="lineChartDiv" style={{ width: "100%", height: "500px" }}></div>
    </>
  );
};

export default ExpensesLineChart;
