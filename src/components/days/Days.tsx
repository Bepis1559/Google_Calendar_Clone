import { useAtom } from "jotai";
import { type ReactElement, useId, useRef, Fragment, useState } from "react";
import { todaysAtom } from "../../contexts/calendar";
import { format } from "date-fns";
import { handleVisibleDates } from "../../helpers/Days/handleVisibleDates";
import {
  handleDayClasses,
  handleNumberInDayClasses,
} from "../../helpers/Days/handleClasses";
import { AddEventModal } from "../Modal/AddEventModal";
import { handleEventModal } from "../../helpers/handleEventModal";
import {
  allDayEventsArrayAtom,
  notAllDayEventsArrayAtom,
} from "../../contexts/events";
import { AllDayEvent } from "../Events/AllDayEvent";
import { NotAllDayEvent } from "../Events/NotAllDayEvent";

export function Days(): ReactElement {
  const [today] = useAtom(todaysAtom);
  const [notAllDayEventsArray] = useAtom(notAllDayEventsArrayAtom);
  const [allDayEventsArray] = useAtom(allDayEventsArrayAtom);
  const unMutableToday = useRef(new Date());
  const visibleDates = handleVisibleDates(today);
  const [isEventModalOpened, setIsEventModalOpened] = useState(
    visibleDates.map(() => false),
  );
  const id = useId();

  return (
    <div className="days">
      {visibleDates.map((visibleDate, index) => {
        return (
          // the whole day card
          <Fragment key={`${id}--${format(visibleDate, "yyyy-MM-dd")}`}>
            {isEventModalOpened[index] ? (
              <AddEventModal
                date={format(visibleDate, "M/d/yy")}
                handleCloseEventModal={() =>
                  handleEventModal(index, "close", setIsEventModalOpened)
                }
              />
            ) : null}
            <div
              className={handleDayClasses(
                today,
                visibleDate,
                unMutableToday.current,
              )}>
              <div className="day-header">
                <div className="week-name">{format(visibleDate, "EEE")}</div>
                <div className={handleNumberInDayClasses(visibleDate)}>
                  {visibleDate.getDate()}
                </div>
                <button
                  onClick={() =>
                    handleEventModal(index, "open", setIsEventModalOpened)
                  }
                  type="button"
                  className="add-event-btn">
                  +
                </button>
              </div>
              {notAllDayEventsArray.map((notAllDayEvent) => {
                const dateToCompareAgainst = format(visibleDate, "M/d/yy");
                return notAllDayEvent.eventDate == dateToCompareAgainst ? (
                  <NotAllDayEvent
                    key={`${id}--${dateToCompareAgainst}--notAllDayEvent`}
                    eventColor={notAllDayEvent.eventColor}
                    eventName={notAllDayEvent.eventName}
                    startTime={notAllDayEvent.startTime}
                  />
                ) : null;
              })}
              {allDayEventsArray.map((allDayEvent) => {
                const dateToCompareAgainst = format(visibleDate, "M/d/yy");
                return allDayEvent.eventDate == dateToCompareAgainst ? (
                  <AllDayEvent
                    key={`${id}--${dateToCompareAgainst}--allDayEvent`}
                    eventColor={allDayEvent.eventColor}
                    eventName={allDayEvent.eventName}
                  />
                ) : null;
              })}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
