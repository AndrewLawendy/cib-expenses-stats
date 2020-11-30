import { createContext } from "react";

export const AppContext = createContext({
  monthData: { type: "", jsonData: [] },
  setMonthData: (_data) => {},
});
