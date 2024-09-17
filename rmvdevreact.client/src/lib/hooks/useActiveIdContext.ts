import { useContext } from "react";
import { ActiveIdContext } from "../../contexts/ActiveIdContextProvider";

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error("ActiveIdContextProvider in ActiveIdContextProvider is null");
  }

  return context;
}