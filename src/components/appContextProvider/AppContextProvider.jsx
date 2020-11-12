import React, { useState } from "react";
import { AppContext } from "../appContext/AppContext.jsx";

const AppContextProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState([]);

  return (
    <AppContext.Provider
      value={{
        jsonData,
        setJsonData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
