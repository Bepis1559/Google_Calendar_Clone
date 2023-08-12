import { useAtom } from "jotai";
import { type MutableRefObject, type RefObject, useEffect } from "react";
import { eventsAtom } from "../contexts/events";
import { hadleObserving, handleRemove } from "../helpers/ResizeDays";

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
          handleRemove(target as HTMLDivElement, removedEvents);
        });
      });

      hadleObserving(divElements_days, daysDivsObserver);

      return () => {
        daysDivsObserver.disconnect();
      };
    }
  }, [events, dayRefs]);
}
