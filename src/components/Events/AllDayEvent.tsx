import { type ReactElement } from "react";
import { allDayEventsArrayAtom } from "../../contexts/events";
import { useAtom } from "jotai";

export function AllDayEvent(props: allDayEvent): ReactElement {
  const { eventColor, eventName, eventDate } = props;
  const [allDayEventsArray] = useAtom(allDayEventsArrayAtom);
  function handleClick() {
    allDayEventsArray.forEach((allDayEvent) => {
      if (
        eventColor == allDayEvent.eventColor &&
        eventName == allDayEvent.eventName &&
        eventDate == allDayEvent.eventDate
      ) {
        console.log(allDayEvent);
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`all-day-event ${eventColor} event`}>
      <div className="event-name">{eventName}</div>
    </button>
  );
}
