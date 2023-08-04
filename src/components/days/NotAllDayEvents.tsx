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
        ({ eventColor, eventName, startTime, endTime, eventDate }) => {
          const dateToCompareAgainst = format(visibleDate, "M/d/yy");
          return eventDate == dateToCompareAgainst ? (
            <NotAllDayEvent
              key={`${id}--${dateToCompareAgainst}--notAllDayEvent--${eventColor}--${eventName}--${startTime}--${endTime}--${eventDate}`}
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
