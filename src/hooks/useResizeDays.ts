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
      const days = divElements_days.map((el) => el?.children);
      const daysLastChild = days.map((day) => {
        if (day) {
          return day[day?.length - 1];
        }
      });
      const daysLastEvents = daysLastChild.filter(
        (lastChild) => lastChild?.tagName == "BUTTON",
      );

      //   const parentsWithAtLeastOneEvent = daysLastEvents.map(lastEvent => lastEvent?.parentElement)
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(({ target }) => {
          const parent = target.parentElement;
          if (parent) {
            if (
              (target as HTMLButtonElement).offsetTop +
                (target as HTMLButtonElement).offsetHeight >
              parent.offsetTop + parent.offsetHeight
            ) {
              console.log("Overflowed");
            }
          }
        });
      });
      daysLastEvents.forEach((lastEvent) => {
        if (lastEvent) {
          resizeObserver.observe(lastEvent);
        }
      });

      return () => resizeObserver.disconnect();
    }
  }, [events, dayRefs]);
}
