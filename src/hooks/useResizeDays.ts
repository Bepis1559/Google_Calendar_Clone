import { useAtom } from "jotai";
import { type MutableRefObject, type RefObject, useEffect } from "react";
import {
  eventsAtom,
  idsOfDaysWithEventsRemovedAtom,
  removedEventsAtom,
} from "../contexts/events";
import {
  addEventBack,
  areThereAnyRemovedEventsFromThatDay,
  getLastButtonEvent,
  hadleObserving,
  handleIdsOfRemovedEvents,
  handleRemove,
  isIntersecting,
  isTherePlaceForEvent,
  syncEventsStateAndRemovedEventsArr,
} from "../helpers/ResizeDays";
import { todaysAtom } from "../contexts/calendar";

export function useResizeDays(
  dayRefs: MutableRefObject<RefObject<HTMLDivElement>[]>,
) {
  const [events] = useAtom(eventsAtom);
  const [, setIdsOfDaysWithEventsRemoved] = useAtom(
    idsOfDaysWithEventsRemovedAtom,
  );
  const [today] = useAtom(todaysAtom);
  const [removedEvents, setRemovedEvents] = useAtom(removedEventsAtom);

  useEffect(() => {
    const { current } = dayRefs;
    if (current) {
      const divElements_days = current.map(
        (day) => day.current,
      ) as HTMLDivElement[];

      const daysDivsObserver = new ResizeObserver((entries) => {
        const sync = () =>
          syncEventsStateAndRemovedEventsArr(
            removedEvents,
            events,
            setRemovedEvents,
          );

        entries.forEach(({ target }) => {
          const day = target as HTMLDivElement;
          const lastEvent = getLastButtonEvent(day);

          if (lastEvent) {
            handleIdsOfRemovedEvents(
              setIdsOfDaysWithEventsRemoved,
              removedEvents,
            );
            const shouldRemove = isIntersecting(lastEvent, day);
            const shouldAdd =
              isTherePlaceForEvent(day) &&
              areThereAnyRemovedEventsFromThatDay(day, removedEvents);
            if (shouldRemove) {
              handleRemove(day, lastEvent, setRemovedEvents);
              sync();
            } else if (shouldAdd) {
              addEventBack(day, removedEvents, setRemovedEvents);
              sync();
            }
          }
        });
      });
      hadleObserving(divElements_days, daysDivsObserver);
      return () => {
        daysDivsObserver.disconnect();
      };
    }
  }, [
    events,
    dayRefs,
    today,
    removedEvents,
    setRemovedEvents,
    setIdsOfDaysWithEventsRemoved,
  ]);
}
