import React, { useState } from "react";
import { AppContext } from "../appContext/AppContext.jsx";

const AppContextProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState([]);
  const [user, setUser] = useState("");

  return (
    <AppContext.Provider
      value={{
        jsonData,
        setJsonData,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
