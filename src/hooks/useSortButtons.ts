import { MutableRefObject, RefObject, useLayoutEffect } from "react";
import { sortEventButtons } from "../helpers/sortEventButtons";
import { useAtom } from "jotai";
import { eventsAtom } from "../contexts/events";

export function useSortButtons(
  dayRefs: MutableRefObject<RefObject<HTMLDivElement>[]>,
) {
  const [events] = useAtom(eventsAtom);
  useLayoutEffect(() => {
    const { current } = dayRefs;
    if (current) {
      const divElements_days = current.map(
        (day) => day.current,
      ) as HTMLDivElement[];
      divElements_days.forEach((day) => sortEventButtons(day));
    }
    // const visibleEvents = document.getElementsByClassName("event");
    // console.log(visibleEvents);
  }, [events, dayRefs]);
}
