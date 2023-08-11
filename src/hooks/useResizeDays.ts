import { useAtom } from "jotai";
import { type MutableRefObject, type RefObject, useEffect } from "react";
import { eventsAtom } from "../contexts/events";
import { handleRemove, isTherePlaceForEvent } from "../helpers/ResizeDays";

export type removedEventType = {
  target: HTMLButtonElement;
  parent: HTMLElement;
};

export function useResizeDays(
  dayRefs: MutableRefObject<RefObject<HTMLDivElement>[]>,
) {
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

      const removedEvents: removedEventType[] = [];
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(({ target }) => {
          const { parentElement } = target;
          if (parentElement) {
            handleRemove(
              target as HTMLButtonElement,
              parentElement,
              removedEvents,
            );
            //
            //
            //
            removedEvents.forEach((event) => {
              if (
                event.parent.isEqualNode(parentElement) &&
                isTherePlaceForEvent(target as HTMLButtonElement, parentElement)
              ) {
                parentElement.appendChild(event.target);
              }
            });
          }
        });
      });
      daysArray.forEach((day) => {
        day?.forEach((event) => resizeObserver.observe(event));
      });

      return () => resizeObserver.disconnect();
    }
  }, [events, dayRefs]);
}
