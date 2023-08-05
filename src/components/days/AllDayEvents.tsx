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
      {allDayEventsArray.map(
        ({
          eventDate,
          eventColor,
          eventName,
          isAllDayChecked,
          id: eventId,
        }) => {
          const dateToCompareAgainst = format(visibleDate, "M/d/yy");
          const eventKey = `${id}--${dateToCompareAgainst}--allDayEvent--${eventDate}--${eventColor}--${eventName}`;
          return eventDate == dateToCompareAgainst ? (
            <AllDayEvent
              isAllDayChecked={isAllDayChecked}
              id={eventId}
              key={eventKey}
              eventColor={eventColor}
              eventName={eventName}
              eventDate={eventDate}
            />
          ) : null;
        },
      )}
    </>
  );
}
