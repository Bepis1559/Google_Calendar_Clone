import { useAtom } from "jotai";
import { type ReactElement, useId, useRef, Fragment, useState } from "react";
import { todaysAtom } from "../contexts/calendar";
import { format } from "date-fns";
import { handleVisibleDates } from "../helpers/handleVisibleDates";
import {
  handleDayClasses,
  handleNumberInDayClasses,
} from "../helpers/handleClasses";
import { AddEventModal } from "./Modal/AddEventModal";

export function Days(): ReactElement {
  const [today] = useAtom(todaysAtom);
  const unMutableToday = useRef(new Date());
  const visibleDates = handleVisibleDates(today);
  const [isEventModalOpened, setIsEventModalOpened] = useState(
    visibleDates.map(() => false),
  );
  const id = useId();

  const handleEventModal = (index: number, modalAction: "open" | "close") => {
    setIsEventModalOpened((prev) => {
      const newState = [...prev];
      newState[index] = modalAction == "open" ? true : false;
      return newState;
    });
  };

  return (
    <div className="days">
      {visibleDates.map((visibleDate, index) => {
        return (
          // the whole day card
          <Fragment key={`${id}--${format(visibleDate, "yyyy-MM-dd")}`}>
            {isEventModalOpened[index] ? (
              <AddEventModal
                handleCloseEventModal={() => handleEventModal(index, "close")}
              />
            ) : null}
            <div
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
                <button
                  onClick={() => handleEventModal(index, "open")}
                  type="button"
                  className="add-event-btn">
                  +
                </button>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}