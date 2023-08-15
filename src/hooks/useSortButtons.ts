import { type ForwardedRef, useLayoutEffect } from "react";
import { sortEventButtons } from "../helpers/sortEventButtons";
import { useAtom } from "jotai";
import { eventsAtom } from "../contexts/events";

export function useSortButtons(dayRef: ForwardedRef<HTMLDivElement>) {
  const [events] = useAtom(eventsAtom);
  const headerElementsInADiv = 1; // so it is not call for an empty day
  useLayoutEffect(() => {
    if (
      dayRef &&
      typeof dayRef !== "function" &&
      dayRef.current &&
      dayRef.current.children.length > headerElementsInADiv
    ) {
      sortEventButtons(dayRef.current);
    } else {
      return;
    }
  }, [events, dayRef]);
}
