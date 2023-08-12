import { useAtom } from "jotai";
import { useEffect } from "react";
import { eventsAtom } from "../contexts/events";

export function useSortEvents() {
  const [events] = useAtom(eventsAtom);
  useEffect(() => {
    console.log(events);
  }, [events]);
}
