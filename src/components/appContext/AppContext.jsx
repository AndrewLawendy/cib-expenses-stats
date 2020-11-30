import { createContext } from "react";

export const AppContext = createContext({
  monthData: { type: "", accountKey: "", jsonData: [] },
  setMonthData: (_data) => {},
});
