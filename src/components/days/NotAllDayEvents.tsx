import { format } from "date-fns";
import { type ReactElement } from "react";
import { NotAllDayEvent } from "../Events/NotAllDayEvent";
import { useAtom } from "jotai";
import { notAllDayEventsArrayAtom } from "../../contexts/events";

export function NotAllDayEvents(props: eventArrayProps): ReactElement {
  const { visibleDate, id } = props;
  const [notAllDayEventsArray] = useAtom(notAllDayEventsArrayAtom);

  return (
    <>
      {notAllDayEventsArray.map(
        ({
          eventColor,
          eventName,
          startTime,
          endTime,
          eventDate,
          id: eventId,
        }) => {
          const dateToCompareAgainst = format(visibleDate, "M/d/yy");
          const key = `${id}--${dateToCompareAgainst}--notAllDayEvent--${eventColor}--${eventName}--${startTime}--${endTime}--${eventDate}`;
          return eventDate == dateToCompareAgainst ? (
            <NotAllDayEvent
              id={eventId}
              key={key}
              eventColor={eventColor}
              eventName={eventName}
              startTime={startTime}
              endTime={endTime}
            />
          ) : null;
        },
      )}
    </>
  );
}
