import { useAtom } from "jotai";
import { forwardRef, type ReactElement, type ForwardedRef } from "react";
import { eventsAtom, removedEventsAtom } from "../../contexts/events";
import { format } from "date-fns";
import { Event } from "./Event";

type props = {
  isForRemovedEvents: boolean;
  visibleDate: Date;
};

function Inner(
  { visibleDate, isForRemovedEvents }: props,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const [events] = useAtom(eventsAtom);
  const [removedEvents] = useAtom(removedEventsAtom);
  const removedEventsIds = removedEvents.map(({ event: { id } }) => id);
  const dateToCompareAgainst = format(visibleDate, "M/d/yy");
  const eventsToRender = events.filter(
    ({ id, eventDate }) =>
      eventDate == dateToCompareAgainst &&
      (isForRemovedEvents
        ? removedEventsIds.includes(id)
        : !removedEventsIds.includes(id)),
  );
  // useEffect(() => {
  //   eventsToRender.length > 1 && console.log(eventsToRender, removedEvents);
  // }, [removedEvents]);
  return (
    <>
      {eventsToRender.map((event) => (
        <Event ref={ref} {...event} key={event.id} />
      ))}
    </>
  );
}

export const Events = forwardRef(Inner);
