import { useAtom } from "jotai";
import { type MutableRefObject, type RefObject, useEffect } from "react";
import { eventsAtom } from "../contexts/events";
import {
  addEventBack,
  areThereAnyRemovedEventsFromThatDay,
  hadleObserving,
  handleRemove,
  isTherePlaceForEvent,
} from "../helpers/ResizeDays";

export type removedEventType = {
  event: HTMLButtonElement;
  parent: HTMLElement;
};

export function useResizeDays(
  dayRefs: MutableRefObject<RefObject<HTMLDivElement>[]>,
) {
  const [events] = useAtom(eventsAtom);
  useEffect(() => {
    const removedEvents: removedEventType[] = [];
    if (dayRefs.current) {
      const divElements_days = dayRefs.current.map(
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
            addEventBack(day, removedEvents);
          }
        });
      });

      hadleObserving(divElements_days, daysDivsObserver);

      return () => {
        daysDivsObserver.disconnect();
      };
    }
  }, [events, dayRefs]);
}
