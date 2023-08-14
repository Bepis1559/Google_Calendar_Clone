import { useAtom } from "jotai";
import { type MutableRefObject, type RefObject, useEffect } from "react";
import { eventsAtom, removedEventsAtom } from "../contexts/events";
import {
  addEventBack,
  areThereAnyRemovedEventsFromThatDay,
  hadleObserving,
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
          const { children } = day;
          const lastEvent = children[children.length - 1] as HTMLButtonElement;
          const shouldRemove = isIntersecting(lastEvent, day);
          const shouldAdd =
            isTherePlaceForEvent(day) &&
            areThereAnyRemovedEventsFromThatDay(day, removedEvents);
          if (shouldRemove) {
            handleRemove(day, lastEvent, setRemovedEvents);
            sync();
          } else if (shouldAdd) {
            console.log("shouldAdd ");
            addEventBack(day, removedEvents, setRemovedEvents);
            sync();
          }
        });
        // console.log(removedEvents);
        // removedEvents.forEach(({ parent: { id } }) => console.log(id));
      });

      hadleObserving(divElements_days, daysDivsObserver);
      return () => {
        daysDivsObserver.disconnect();
      };
    }
  }, [events, dayRefs, today, removedEvents, setRemovedEvents]);
}
