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
      {allDayEventsArray.map((allDayEvent) => {
        const dateToCompareAgainst = format(visibleDate, "M/d/yy");
        return allDayEvent.eventDate == dateToCompareAgainst ? (
          <AllDayEvent
            key={`${id}--${dateToCompareAgainst}--allDayEvent`}
            eventColor={allDayEvent.eventColor}
            eventName={allDayEvent.eventName}
          />
        ) : null;
      })}
    </>
  );
}
