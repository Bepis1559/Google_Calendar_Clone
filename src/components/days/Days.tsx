import { useAtom } from "jotai";
import {
  type ReactElement,
  useId,
  useRef,
  Fragment,
  useState,
  createRef,
  useEffect,
  useMemo,
} from "react";
import { todaysAtom } from "../../contexts/calendar";
import { format } from "date-fns";
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
import { MoreEventsModal } from "../hiddenEventsRelated/MoreEventsModal";
import { handleVisibleDates } from "../../helpers/Days/handleVisibleDates";
import { useDaysIds } from "../../hooks/useDaysIds";

export function Days(): ReactElement {
  const [today] = useAtom(todaysAtom);
  const [idsOfDaysWithEventsRemoved] = useAtom(idsOfDaysWithEventsRemovedAtom);
  const unMutableToday = useRef(new Date());
  const visibleDates = useMemo(() => handleVisibleDates(today), [today]);
  const monthObj = useDaysIds(today, visibleDates);

  const [isEventModalOpened, setIsEventModalOpened] = useState(
    visibleDates.map(() => false),
  );
  const [isMoreEventsModalOpened, setIsMoreEventsModalOpened] = useState(
    visibleDates.map(() => false),
  );
  const [removedEvents] = useAtom(removedEventsAtom);
  const id = useId();
  const [dayRefs, setDayRefs] = useState(
    visibleDates.map(() => createRef<HTMLDivElement>()),
  );

  useEffect(() => {
    setDayRefs(visibleDates.map(() => createRef<HTMLDivElement>()));
  }, [visibleDates]);

  useResizeDays(dayRefs);

  return (
    <div className="days">
      {visibleDates.map((visibleDate, index) => {
        const dayId = monthObj?.ids[index];

        const currentDayRef = dayRefs[index];
        const currentDate = format(visibleDate, "M/d/yy");
        return (
          // the whole day card
          <Fragment key={`${id}--${format(visibleDate, "yyyy-MM-dd")}`}>
            {isMoreEventsModalOpened[index] ? (
              <MoreEventsModal
                visibleDate={visibleDate}
                handleEventModal={() =>
                  handleEventModal(index, "close", setIsMoreEventsModalOpened)
                }
                currentDate={currentDate}
                ref={currentDayRef}
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

              <Events
                isForRemovedEvents={false}
                ref={currentDayRef}
                visibleDate={visibleDate}
              />
              {idsOfDaysWithEventsRemoved.includes(dayId!) &&
              removedEvents.length > 0 ? (
                <ShowMoreEventsButton
                  dayIndex={index}
                  setIsMoreEventsModalOpened={setIsMoreEventsModalOpened}
                  dayId={dayId!}
                />
              ) : null}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
