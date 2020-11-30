import React, { useState } from "react";
import { AppContext } from "../appContext/AppContext.jsx";

const AppContextProvider = ({ children }) => {
  const [monthData, setMonthData] = useState({
    type: "",
    accountKey: "",
    jsonData: [],
  });

  return (
    <AppContext.Provider
      value={{
        monthData,
        setMonthData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
