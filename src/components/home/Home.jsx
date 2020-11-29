import React from "react";
import { Tab } from "semantic-ui-react";

import JSONData from "../jsonData/JSONData.jsx";
import UploadStatement from "../uploadStatement/UploadStatement.jsx";
import OneMonthStats from "../oneMonthStats/OneMonthStats.jsx";

const Home = () => {
  const panes = [
    {
      menuItem: "JSON (Credit Only)",
      render: () => (
        <Tab.Pane>
          <JSONData />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Upload File",
      render: () => (
        <Tab.Pane>
          <UploadStatement />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <Tab panes={panes} />
      <OneMonthStats />
    </>
  );
};

export default Home;
