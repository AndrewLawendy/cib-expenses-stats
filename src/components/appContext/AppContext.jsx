import { createContext } from "react";

export const AppContext = createContext({
  jsonData: [],
  setJsonData: (_data) => {},
});
