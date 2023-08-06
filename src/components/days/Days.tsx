import { useAtom } from "jotai";
import { type ReactElement, useId, useRef, Fragment, useState } from "react";
import { todaysAtom } from "../../contexts/calendar";
import { format } from "date-fns";
import { handleVisibleDates } from "../../helpers/Days/handleVisibleDates";
import { handleDayClasses } from "../../helpers/Days/handleClasses";
import { AddEventModal } from "../Modal/AddEventModal";
import { handleEventModal } from "../../helpers/handleEventModal";
import { DayHeader } from "./DayHeader";
import { Events } from "../Events/Events";

export function Days(): ReactElement {
  const [today] = useAtom(todaysAtom);

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
          <Fragment
            key={`${id}--${format(
              visibleDate,
              "yyyy-MM-dd",
            )}--${visibleDate.getSeconds()}`}>
            {isEventModalOpened[index] ? (
              <AddEventModal
                date={format(visibleDate, "M/d/yy")}
                handleEventModal={() =>
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
              <DayHeader
                visibleDate={visibleDate}
                index={index}
                setIsEventModalOpened={setIsEventModalOpened}
              />

              <Events visibleDate={visibleDate} />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
