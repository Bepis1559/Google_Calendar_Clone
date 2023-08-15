import type { ReactElement } from "react";

type bonusProp = {
  startTime: string;
};

export function NotAllDayEventButton(
  props: EventButtonProps & bonusProp,
): ReactElement {
  const { eventColor, startTime, eventName, handleClick, eventId } = props;
  return (
    <button
      data-start_time={startTime}
      data-is_all_day="false"
      id={eventId}
      onClick={handleClick}
      type="button"
      className="event">
      <div className={`color-dot ${eventColor}`}></div>
      <div className="event-time">{startTime}</div>
      <div className="event-name">{eventName}</div>
    </button>
  );
}
