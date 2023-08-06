import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { eventsAtom } from "../../contexts/events";
import { format } from "date-fns";
import { Event } from "./Event";

export function Events({ visibleDate }: eventArrayProps): ReactElement {
  const [eventsArray] = useAtom(eventsAtom);
  return (
    <>
      {eventsArray.map((event) => {
        const dateToCompareAgainst = format(visibleDate, "M/d/yy");
        return event.eventDate == dateToCompareAgainst ? (
          <Event {...event} key={event.id} />
        ) : null;
      })}
    </>
  );
}
