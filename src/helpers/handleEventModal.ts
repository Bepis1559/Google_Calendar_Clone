import type { Dispatch, SetStateAction } from "react";

export function handleEventModal(
  index: number,
  modalAction: "open" | "close",
  setIsEventModalOpened: Dispatch<SetStateAction<boolean[]>>,
) {
  setIsEventModalOpened((prev) => {
    const newState = [...prev];
    newState[index] = modalAction == "open" ? true : false;
    return newState;
  });
}
