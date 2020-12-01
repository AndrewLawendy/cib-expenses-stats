import { createLocalStorageStateHook } from "use-local-storage-state";

export const useCibExpensesHistory = createLocalStorageStateHook(
  "cibExpensesHistory",
  {}
);

export const useUser = createLocalStorageStateHook("user", "");
