import { useAtom } from "jotai";
import type { ReactElement } from "react";
import { allDayEventsArrayAtom } from "../../contexts/events";
import { format } from "date-fns";
import { AllDayEvent } from "../Events/AllDayEvent";

export function AllDayEvents(props: eventArrayProps): ReactElement {
  const [allDayEventsArray] = useAtom(allDayEventsArrayAtom);
  const { id, visibleDate } = props;
  return (
    <>
      {allDayEventsArray.map(({ eventDate, eventColor, eventName }) => {
        const dateToCompareAgainst = format(visibleDate, "M/d/yy");
        return eventDate == dateToCompareAgainst ? (
          <AllDayEvent
            key={`${id}--${dateToCompareAgainst}--allDayEvent--${eventDate}--${eventColor}--${eventName}`}
            eventColor={eventColor}
            eventName={eventName}
          />
        ) : null;
      })}
    </>
  );
}
