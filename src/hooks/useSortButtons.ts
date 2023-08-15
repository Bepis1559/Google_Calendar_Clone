import { type ForwardedRef, useLayoutEffect } from "react";
import { sortEventButtons } from "../helpers/sortEventButtons";
import { useAtom } from "jotai";
import { eventsAtom } from "../contexts/events";

export function useSortButtons(dayRef: ForwardedRef<HTMLDivElement>) {
  const [events] = useAtom(eventsAtom);
  useLayoutEffect(() => {
    if (dayRef && typeof dayRef !== "function") {
      sortEventButtons(dayRef.current as HTMLDivElement);
    }
  }, [events, dayRef]);
}
