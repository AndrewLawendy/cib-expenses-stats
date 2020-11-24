import React, { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import {
  useCreditExpensesHistory,
  useUser,
} from "../../utils/localStorageHooks.js";

am4core.useTheme(am4themes_animated);

const MonthsLineChart = () => {
  const [creditExpensesHistory] = useCreditExpensesHistory();
  const [user] = useUser();
  const userHistory = creditExpensesHistory[user];
  const date = new Date();
  const data = Array.from({ length: 12 }, (_, i) => {
    const year = date.getUTCFullYear();
    const historyKey = `${i + 1}-${year}`;
    const { total } = userHistory[historyKey] || { total: 0 };

    return { date: new Date(year, i), total };
  });

  useLayoutEffect(() => {
    const chart = am4core.create("monthsLineChartDiv", am4charts.XYChart);

    chart.data = data;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "total";
    series.dataFields.dateX = "date";
    series.tooltipText = "{total} EGP";

    series.tooltip.pointerOrientation = "vertical";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();
  }, []);

  return (
    <div
      id="monthsLineChartDiv"
      style={{ width: "100%", height: "500px" }}
    ></div>
  );
};

export default MonthsLineChart;
