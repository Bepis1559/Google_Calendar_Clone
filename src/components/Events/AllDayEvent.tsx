import { type ReactElement } from "react";
import { allDayEventsArrayAtom } from "../../contexts/events";
import { useAtom } from "jotai";

export function AllDayEvent(props: allDayEvent): ReactElement {
  const { eventColor, eventName } = props;
  const [allDayEventsArray] = useAtom(allDayEventsArrayAtom);
  function handleClick() {
    allDayEventsArray.forEach((allDayEvent) => console.log(allDayEvent));
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
