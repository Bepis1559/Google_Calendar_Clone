import { useAtom } from "jotai";
import { type ReactElement, useId, useRef, Fragment, useState } from "react";
import { todaysAtom } from "../contexts/calendar";
import { format } from "date-fns";
import { handleVisibleDates } from "../helpers/handleVisibleDates";
import {
  handleDayClasses,
  handleNumberInDayClasses,
} from "../helpers/handleClasses";
import { AddEventModal } from "./AddEventModal";

export function Days(): ReactElement {
  const [today] = useAtom(todaysAtom);
  const [isEventModalOpened, setIsEventModalOpened] = useState(false);
  const unMutableToday = useRef(new Date());
  const visibleDates = handleVisibleDates(today);
  const id = useId();

  const handleOpenEventModal = () => setIsEventModalOpened(true);
  const handleCloseEventModal = () => setIsEventModalOpened(false);

  return (
    <div className="days">
      {visibleDates.map((visibleDate) => {
        return (
          // the whole day card
          <Fragment key={`${id}--${format(visibleDate, "yyyy-MM-dd")}`}>
            {isEventModalOpened ? (
              <AddEventModal handleCloseEventModal={handleCloseEventModal} />
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
                  onClick={handleOpenEventModal}
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
