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
                day?.forEach((event) => {
                  if (event == target) {
                    removedEvents[dayIndex].push(target as HTMLButtonElement);
                    target.remove();
                  }
                });
              });
            }
            console.log(isTherePlaceForEvent(parentElement));
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

function isTherePlaceForEvent(parentElement: HTMLElement) {
  const parentHeight = parentElement.getBoundingClientRect().height;
  let childrenHeight = 0;
  let eventHeight = 0;
  // let eventMargin_Bottom = 0;
  Array.from(parentElement.children).forEach((child) => {
    childrenHeight += child.getBoundingClientRect().height;
    if (child.tagName == "BUTTON") {
      eventHeight = child.getBoundingClientRect().height;
    }
  });
  // console.log("parentHeight : " + parentHeight);
  // console.log("childrenHeight : " + childrenHeight);
  // console.log("eventHeight : " + eventHeight);

  return parentHeight - childrenHeight > eventHeight;
}

function isIntersecting(child: HTMLButtonElement, parent: HTMLElement) {
  return (
    child.offsetTop + child.offsetHeight >
    parent.offsetTop + parent.offsetHeight
  );
}
