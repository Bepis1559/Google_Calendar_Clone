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
          sync();
          handleRemove(day, setRemovedEvents);
          sync();
          if (
            isTherePlaceForEvent(day) &&
            areThereAnyRemovedEventsFromThatDay(day, removedEvents)
          ) {
            addEventBack(day, removedEvents, setRemovedEvents);
            sync();
          }
        });
      });

      hadleObserving(divElements_days, daysDivsObserver);
      // console.log(removedEvents);
      return () => {
        daysDivsObserver.disconnect();
      };
    }
  }, [events, dayRefs, today, removedEvents, setRemovedEvents]);
}
