import { useAtom } from "jotai";
import { type MutableRefObject, type RefObject, useEffect } from "react";
import { eventsAtom } from "../contexts/events";

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

      const removedEvents: HTMLButtonElement[][] = daysArray.map(() => []);
      // console.log(removedEvents);
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(({ target }) => {
          const { parentElement } = target;
          if (parentElement) {
            if (isIntersecting(target as HTMLButtonElement, parentElement)) {
              daysArray.forEach((day, dayIndex) => {
                day?.forEach((event, eventIndex) => {
                  if (event == target) {
                    removedEvents[dayIndex].push(target as HTMLButtonElement);
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
  }, [events, dayRefs]);
}

function isIntersecting(child: HTMLButtonElement, parent: HTMLElement) {
  return (
    child.offsetTop + child.offsetHeight >
    parent.offsetTop + parent.offsetHeight
  );
}
