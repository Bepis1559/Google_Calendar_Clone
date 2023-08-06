import type { ReactElement } from "react";

type bonusProp = {
  startTime: string;
};

export function NotAllDayEventButton(
  props: EventButtonProps & bonusProp,
): ReactElement {
  const { eventColor, startTime, eventName, handleClick } = props;
  return (
    <button onClick={handleClick} type="button" className="event">
      <div className={`color-dot ${eventColor}`}></div>
      <div className="event-time">{startTime}</div>
      <div className="event-name">{eventName}</div>
    </button>
  );
}
