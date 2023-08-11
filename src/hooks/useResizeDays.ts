import { useAtom } from "jotai";
import {
  type MutableRefObject,
  type RefObject,
  useEffect,
  useCallback,
} from "react";
import { eventsAtom } from "../contexts/events";
import {
  appendEventBackIfPossible,
  isIntersecting,
} from "../helpers/ResizeDays";

export type removedEventsType = {
  event: HTMLButtonElement;
  parent: HTMLElement;
};

export function useResizeDays(
  dayRefs: MutableRefObject<RefObject<HTMLDivElement>[]>,
) {
  const appendEventBackIfPossible_withCallBack = useCallback(
    appendEventBackIfPossible,
    [],
  );

  const [events] = useAtom(eventsAtom);
  useEffect(() => {
    if (dayRefs.current) {
      const divElements_days = dayRefs.current.map((day) => day.current);
      const daysChildren = divElements_days.map((el) => el?.children);
      const daysArray = daysChildren.map(
        (dayChild) =>
          dayChild &&
          Array.from(dayChild).filter((day) => day.tagName == "BUTTON"),
      );

      const removedEvents: removedEventsType[][] = daysArray.map(() => []);
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(({ target }) => {
          const { parentElement } = target;
          if (parentElement) {
            if (isIntersecting(target as HTMLButtonElement, parentElement)) {
              daysArray.forEach((day, dayIndex) => {
                day?.forEach((event) => {
                  if (event == target) {
                    removedEvents[dayIndex].push({
                      event: target as HTMLButtonElement,
                      parent: parentElement,
                    });
                    target.remove();
                  }
                });
              });
            }
          }
        });
      });
      daysArray.forEach((day) => {
        day?.forEach((event) => resizeObserver.observe(event));
      });

      return () => resizeObserver.disconnect();
    }
  }, [events, dayRefs, appendEventBackIfPossible_withCallBack]);
}
