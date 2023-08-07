import { useAtom } from "jotai";
import { useEffect } from "react";
import { eventsAtom } from "../contexts/events";

export function useEventsLocalStorage() {
  const [eventsArray] = useAtom(eventsAtom);
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(eventsArray));
  }, [eventsArray]);
}
