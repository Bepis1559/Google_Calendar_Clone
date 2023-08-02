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
      {notAllDayEventsArray.map((notAllDayEvent) => {
        const dateToCompareAgainst = format(visibleDate, "M/d/yy");
        return notAllDayEvent.eventDate == dateToCompareAgainst ? (
          <NotAllDayEvent
            key={`${id}--${dateToCompareAgainst}--notAllDayEvent`}
            eventColor={notAllDayEvent.eventColor}
            eventName={notAllDayEvent.eventName}
            startTime={notAllDayEvent.startTime}
          />
        ) : null;
      })}
    </>
  );
}
