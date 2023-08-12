import { useAtom } from "jotai";
import { type MutableRefObject, type RefObject, useEffect } from "react";
import { eventsAtom, removedEventsAtom } from "../contexts/events";
import {
  addEventBack,
  areThereAnyRemovedEventsFromThatDay,
  hadleObserving,
  handleRemove,
  isTherePlaceForEvent,
  syncEventsStateAndRemovedEventsArr,
} from "../helpers/ResizeDays";
import { todaysAtom } from "../contexts/calendar";

export function useResizeDays(
  dayRefs: MutableRefObject<RefObject<HTMLDivElement>[]>,
) {
  const [events] = useAtom(eventsAtom);
  const [today] = useAtom(todaysAtom);
  const [removedEvents] = useAtom(removedEventsAtom);

  useEffect(() => {
    const { current } = dayRefs;
    if (current) {
      const divElements_days = current.map(
        (day) => day.current,
      ) as HTMLDivElement[];

      const daysDivsObserver = new ResizeObserver((entries) => {
        entries.forEach(({ target }) => {
          const day = target as HTMLDivElement;
          handleRemove(day, removedEvents);
          if (
            isTherePlaceForEvent(day) &&
            areThereAnyRemovedEventsFromThatDay(day, removedEvents)
          ) {
            syncEventsStateAndRemovedEventsArr(removedEvents, events);
            addEventBack(day, removedEvents);
          }
        });
      });

      hadleObserving(divElements_days, daysDivsObserver);

      return () => {
        daysDivsObserver.disconnect();
      };
    }
  }, [events, dayRefs, today, removedEvents]);
}
