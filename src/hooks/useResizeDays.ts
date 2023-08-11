import { useAtom } from "jotai";
import {
  type MutableRefObject,
  type RefObject,
  useEffect,
  useMemo,
} from "react";
import { eventsAtom } from "../contexts/events";
import {
  addEventBack,
  currentEventsObserverCallBack,
} from "../helpers/ResizeDays";

export type removedEventType = {
  target: HTMLButtonElement;
  parent: HTMLElement;
};

export function useResizeDays(
  dayRefs: MutableRefObject<RefObject<HTMLDivElement>[]>,
) {
  const [events] = useAtom(eventsAtom);
  const removedEvents: removedEventType[] = useMemo(() => [], []);
  useEffect(() => {
    if (dayRefs.current) {
      const divElements_days = dayRefs.current.map((day) => day.current);
      const daysChildren = divElements_days.map((el) => el?.children);
      const daysArray = daysChildren.map(
        (dayChild) =>
          dayChild &&
          Array.from(dayChild).filter((day) => day.tagName == "BUTTON"),
      );

      const currentEventsObserver: ResizeObserver = new ResizeObserver(
        (entries) =>
          currentEventsObserverCallBack(
            entries,
            removedEvents,
            currentEventsObserver,
            removedEventsObserver,
          ),
      );
      const removedEventsObserver: ResizeObserver = new ResizeObserver(
        (entries) =>
          entries.forEach(({ target }) => {
            addEventBack(
              removedEvents,
              target as HTMLButtonElement,
              currentEventsObserver,
              removedEventsObserver,
            );
          }),
      );

      daysArray.forEach((day) => {
        day?.forEach((event) => currentEventsObserver.observe(event));
      });

      return () => {
        currentEventsObserver.disconnect();
        removedEventsObserver.disconnect();
      };
    }
  }, [events, dayRefs, removedEvents]);
}
