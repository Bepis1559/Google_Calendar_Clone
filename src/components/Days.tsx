import { useAtom } from "jotai";
import { type ReactElement, useId } from "react";
import { todaysAtom } from "../contexts/calendar";
import { format, isBefore, isSameMonth, isToday, startOfDay } from "date-fns";
import { handleVisibleDates } from "../helpers/handleVisibleDates";

export function Days(): ReactElement {
  const [today] = useAtom(todaysAtom);
  const visibleDates = handleVisibleDates(today);
  const id = useId();

  return (
    <div className="days">
      {visibleDates.map((visibleDate) => {
        return (
          // the whole day card
          <div
            key={`${id}--${format(visibleDate, "yyyy-MM-dd")}`}
            className={`${
              isSameMonth(visibleDate, today) ? "" : "non-month-day"
            } ${
              isBefore(startOfDay(visibleDate), startOfDay(today))
                ? "old-month-day"
                : ""
            } day`}>
            <div className="day-header">
              {/* day name as a day of the week  */}
              <div className="week-name">{format(visibleDate, "EEE")}</div>
              {/* the current day as a number */}
              <div
                className={`${isToday(visibleDate) ? "today" : ""} day-number`}>
                {visibleDate.getDate()}
              </div>
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
