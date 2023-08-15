import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { eventsAtom } from "../../contexts/events";
import { format } from "date-fns";
import { Event } from "./Event";

export function Events({ visibleDate }: eventArrayProps): ReactElement {
  const [events] = useAtom(eventsAtom);
  const dateToCompareAgainst = format(visibleDate, "M/d/yy");
  const eventsToRender = events.filter(
    ({ eventDate }) => eventDate == dateToCompareAgainst,
  );

  return (
    <>
      {eventsToRender.map((event) => (
        <Event {...event} key={event.id} />
      ))}
    </>
  );
}
