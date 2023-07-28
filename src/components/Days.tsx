import { useAtom } from "jotai";
import { type ReactElement, useId, useRef } from "react";
import { todaysAtom } from "../contexts/calendar";
import { format } from "date-fns";
import { handleVisibleDates } from "../helpers/handleVisibleDates";
import {
  handleDayClasses,
  handleNumberInDayClasses,
} from "../helpers/handleClasses";

export function Days(): ReactElement {
  const unMutableToday = useRef(new Date());
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
            className={handleDayClasses(
              today,
              visibleDate,
              unMutableToday.current,
            )}>
            <div className="day-header">
              {/* day name as a day of the week  */}
              <div className="week-name">{format(visibleDate, "EEE")}</div>
              {/* the current day as a number */}
              <div className={handleNumberInDayClasses(visibleDate)}>
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
