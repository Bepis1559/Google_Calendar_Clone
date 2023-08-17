import { useAtom } from "jotai";
import {
  type ReactElement,
  useId,
  useRef,
  Fragment,
  useState,
  createRef,
} from "react";
import { todaysAtom } from "../../contexts/calendar";
import { format } from "date-fns";
import { handleVisibleDates } from "../../helpers/Days/handleVisibleDates";
import { handleDayClasses } from "../../helpers/Days/handleClasses";
import { AddEventModal } from "../Modal/AddEventModal";
import { handleEventModal } from "../../helpers/handleEventModal";
import { DayHeader } from "./DayHeader";
import { Events } from "../Events/Events";
import { useResizeDays } from "../../hooks/useResizeDays";
import {
  idsOfDaysWithEventsRemovedAtom,
  removedEventsAtom,
} from "../../contexts/events";
import { ShowMoreEventsButton } from "../hiddenEventsRelated/ShowMoreEventsButton";
import { CountOccurrencesInArray } from "../../helpers/Days/CountOccurrencesInArray";
import { MoreEventsModal } from "../hiddenEventsRelated/MoreEventsModal";

export function Days(): ReactElement {
  const [today] = useAtom(todaysAtom);
  const [idsOfDaysWithEventsRemoved] = useAtom(idsOfDaysWithEventsRemovedAtom);
  const unMutableToday = useRef(new Date());
  const visibleDates = handleVisibleDates(today);
  const [isEventModalOpened, setIsEventModalOpened] = useState(
    visibleDates.map(() => false),
  );
  const [isMoreEventsModalOpened, setIsMoreEventsModalOpened] = useState(
    visibleDates.map(() => false),
  );
  const [removedEvents] = useAtom(removedEventsAtom);
  const id = useId();
  const dayRefs = useRef(visibleDates.map(() => createRef<HTMLDivElement>()));
  const daysIds = useRef(visibleDates.map(() => crypto.randomUUID()));
  const removedEventsOfThatDay = (dayId: string) =>
    removedEvents.filter(({ parent: { id } }) => id == dayId);

  useResizeDays(dayRefs);

  return (
    <div className="days">
      {visibleDates.map((visibleDate, index) => {
        const dayId = daysIds.current[index];
        const numOfHiddenEvents = CountOccurrencesInArray(
          idsOfDaysWithEventsRemoved,
          dayId,
        );
        const currentDayRef = dayRefs.current[index];
        const currentDate = format(visibleDate, "M/d/yy");
        return (
          // the whole day card
          <Fragment key={`${id}--${format(visibleDate, "yyyy-MM-dd")}`}>
            {isMoreEventsModalOpened[index] ? (
              <MoreEventsModal
                removedEventsOfThatDay={removedEventsOfThatDay(dayId)}
                handleEventModal={() =>
                  handleEventModal(index, "close", setIsMoreEventsModalOpened)
                }
                currentDate={currentDate}
              />
            ) : null}

            {isEventModalOpened[index] ? (
              <AddEventModal
                date={currentDate}
                handleEventModal={() =>
                  handleEventModal(index, "close", setIsEventModalOpened)
                }
              />
            ) : null}
            <div
              id={dayId}
              ref={currentDayRef}
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

              <Events ref={currentDayRef} visibleDate={visibleDate} />
              {idsOfDaysWithEventsRemoved.includes(dayId) &&
              numOfHiddenEvents > 0 &&
              removedEvents.length > 0 ? (
                <ShowMoreEventsButton
                  dayId={dayId}
                  numOfHiddenEvents={numOfHiddenEvents}
                  dayIndex={index}
                  currentDate={currentDate}
                  isMoreEventsModalOpened={isMoreEventsModalOpened[index]}
                  setIsMoreEventsModalOpened={setIsMoreEventsModalOpened}
                />
              ) : null}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
