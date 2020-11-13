import React, { useContext, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

import { AppContext } from "../appContext/AppContext.jsx";

const ExpensesChart = () => {
  const { jsonData } = useContext(AppContext);
  const summedDescription = jsonData.reduce((acc, { description, amount }) => {
    if (!acc[description]) acc[description] = 0;
    acc[description] += amount;
    return acc;
  }, {});
  const pieData = Object.keys(summedDescription).map((key) => ({
    description: key,
    amount: summedDescription[key],
  }));

  useLayoutEffect(() => {
    const chart = am4core.create("chartdiv", am4charts.PieChart);

    chart.data = pieData;

    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "description";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    return () => {
      chart.dispose();
    };
  }, [jsonData]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default ExpensesChart;
