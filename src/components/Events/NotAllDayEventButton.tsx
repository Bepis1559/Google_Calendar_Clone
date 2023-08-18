import type { ReactElement } from "react";

export function NotAllDayEventButton(props: EventButtonProps): ReactElement {
  const { eventColor, startTime, eventName, handleClick, id, isAllDayChecked } =
    props;
  return (
    <button
      onClick={handleClick}
      type="button"
      id={id}
      data-is_all_day_checked={isAllDayChecked}
      data-start_time={startTime}
      className="event">
      <div className={`color-dot ${eventColor}`}></div>
      <div className="event-time">{startTime}</div>
      <div className="event-name">{eventName}</div>
    </button>
  );
}
