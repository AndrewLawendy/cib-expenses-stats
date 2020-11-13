import { createLocalStorageStateHook } from "use-local-storage-state";

export const useCreditExpensesHistory = createLocalStorageStateHook(
  "creditExpensesHistory",
  {}
);

export const useUser = createLocalStorageStateHook("user", "");
