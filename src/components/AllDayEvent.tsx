import { type ReactElement } from "react";

export function AllDayEvent(props: EventProps): ReactElement {
  const { eventColor, eventName } = props;

  return (
    <button type="button" className={`all-day-event ${eventColor} event`}>
      <div className="event-name">{eventName}</div>
    </button>
  );
}
