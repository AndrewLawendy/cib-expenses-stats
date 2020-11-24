import React, { useContext, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

import { AppContext } from "../appContext/AppContext.jsx";

const ExpensesLineChart = () => {
  const { jsonData } = useContext(AppContext);
  const summedData = jsonData.reduce((acc, { date, description, amount }) => {
    if (!acc[date]) acc[date] = { amount: 0, description: "" };
    acc[date].amount += amount;
    acc[date].description += `${description} - "${amount} EGP"\n`;

    return acc;
  }, {});
  const chartData = Object.keys(summedData).map((summedDate) => {
    const { amount, description } = summedData[summedDate];
    const [day, month, year] = summedDate.split("/");
    const date = new Date(`${month}/${day}/${year}`);

    return { date, amount, description };
  });

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
    <div id="lineChartDiv" style={{ width: "100%", height: "500px" }}></div>
  );
};

export default ExpensesLineChart;
