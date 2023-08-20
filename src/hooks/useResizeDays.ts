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
  handleRemove,
  isIntersecting,
  isTherePlaceForEvent,
  syncEventsStateAndRemovedEventsState,
  syncRemovedEventsIds_With_RemovedEventsState,
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
        const syncEventsAndRemovedEvents = () =>
          syncEventsStateAndRemovedEventsState(
            removedEvents,
            events,
            setRemovedEvents,
          );
        const syncRemovedEventsAndTheirIds = () =>
          syncRemovedEventsIds_With_RemovedEventsState(
            setIdsOfDaysWithEventsRemoved,
            removedEvents,
          );

        entries.forEach(({ target }) => {
          const day = target as HTMLDivElement;

          const lastEvent = getLastButtonEvent(day);
          const shouldRemove = isIntersecting(lastEvent, day);
          const shouldAdd =
            isTherePlaceForEvent(day) &&
            areThereAnyRemovedEventsFromThatDay(day, removedEvents);
          if (lastEvent) {
            syncRemovedEventsAndTheirIds();

            if (shouldRemove) {
              handleRemove(day, lastEvent, setRemovedEvents);
              syncEventsAndRemovedEvents();
            } else if (shouldAdd) {
              addEventBack(day, removedEvents, setRemovedEvents);
              syncEventsAndRemovedEvents();
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
