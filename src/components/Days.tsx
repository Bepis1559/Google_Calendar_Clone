import { useAtom } from "jotai";
import { type ReactElement, useId } from "react";
import { todaysAtom } from "../contexts/calendar";
import { format } from "date-fns";
import { handleVisibleDates } from "../helpers/handleVisibleDates";

export function Days(): ReactElement {
  const [today] = useAtom(todaysAtom);
  const visibleDates = handleVisibleDates(today);
  const id = useId();

  return (
    <div className="days">
      {visibleDates.map((visibleDate, index) => {
        return (
          <div key={`${id}--${visibleDate}--${index}`} className="day ">
            <div className="day-header">
              <div className="week-name">{format(visibleDate, "EEE")}</div>
              <div className={"day-number"}>{visibleDate.getDate()}</div>
              <button type="button" className="add-event-btn">
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
