import { useAtom } from "jotai";
import { type MutableRefObject, type RefObject, useEffect } from "react";
import { eventsAtom } from "../contexts/events";

export function useResizeDays(
  dayRefs: MutableRefObject<RefObject<HTMLDivElement>[]>,
) {
  const [events] = useAtom(eventsAtom);
  useEffect(() => {
    const chosenDay = dayRefs.current[10];
    const chosenDayChildren = chosenDay.current?.children;

    if (chosenDayChildren) {
      const lastEvent = chosenDayChildren[chosenDayChildren.length - 1];
      console.log(lastEvent);
    }
  }, [events, dayRefs]);
}
