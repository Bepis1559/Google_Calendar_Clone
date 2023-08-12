import type { Dispatch, SetStateAction } from "react";

export function sortEvents(setEventsArray: Dispatch<SetStateAction<event[]>>) {
  setEventsArray((prev) => {
    return [...prev].sort((a, b) => {
      if (a.isAllDayChecked && !b.isAllDayChecked) {
        return -1;
      } else if (!a.isAllDayChecked && b.isAllDayChecked) {
        return 1;
      } else if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      } else {
        return 0;
      }
    });
  });
}
