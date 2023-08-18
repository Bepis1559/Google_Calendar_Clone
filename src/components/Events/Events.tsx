import { useAtom } from "jotai";
import { forwardRef, type ReactElement, type ForwardedRef } from "react";
import { eventsAtom } from "../../contexts/events";
import { format } from "date-fns";
import { Event } from "./Event";

type props = {
  visibleDate: Date;
};

function Inner(
  { visibleDate }: props,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const [events] = useAtom(eventsAtom);
  const dateToCompareAgainst = format(visibleDate, "M/d/yy");
  const eventsToRender = events.filter(
    ({ eventDate }) => eventDate == dateToCompareAgainst,
  );
  return (
    <>
      {eventsToRender.map((event) => (
        <Event ref={ref} {...event} key={event.id} />
      ))}
    </>
  );
}

export const Events = forwardRef(Inner);
