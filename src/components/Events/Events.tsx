import { useAtom } from "jotai";
import { forwardRef, type ReactElement, type ForwardedRef } from "react";
import { eventsAtom } from "../../contexts/events";
import { format } from "date-fns";
import { Event } from "./Event";
import { useSortButtons } from "../../hooks/useSortButtons";

function Inner(
  { visibleDate }: eventArrayProps,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const [events] = useAtom(eventsAtom);
  const dateToCompareAgainst = format(visibleDate, "M/d/yy");
  const eventsToRender = events.filter(
    ({ eventDate }) => eventDate == dateToCompareAgainst,
  );
  useSortButtons(ref);
  return (
    <>
      {eventsToRender.map((event) => (
        <Event {...event} key={event.id} />
      ))}
    </>
  );
}

export const Events = forwardRef(Inner);
