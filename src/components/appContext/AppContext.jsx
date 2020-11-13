import { createContext } from "react";

export const AppContext = createContext({
  jsonData: [],
  setJsonData: (_data) => {},
  user: "",
  setUser: (_data) => {},
});
