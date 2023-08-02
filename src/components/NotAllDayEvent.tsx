import type { ReactElement } from "react";

export function NotAllDayEvent(props: NotAllDayEventProps): ReactElement {
  const { eventColor, startTime, eventName } = props;
  return (
    <button type="button" className="event">
      <div className={`color-dot ${eventColor}`}></div>
      <div className="event-time">{startTime}</div>
      <div className="event-name">{eventName}</div>
    </button>
  );
}
