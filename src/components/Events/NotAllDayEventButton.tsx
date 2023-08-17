import type { ReactElement } from "react";

export function NotAllDayEventButton(props: EventButtonProps): ReactElement {
  const {
    eventColor,
    startTime,
    eventName,
    handleClick,
    id,
    isAllDayChecked,
    eventDate,
    endTime,
  } = props;
  return (
    <button
      onClick={handleClick}
      type="button"
      id={id}
      data-is_all_day_checked={isAllDayChecked}
      data-event_color={eventColor}
      data-event_name={eventName}
      data-event_date={eventDate}
      data-start_time={startTime}
      data-end_time={endTime}
      className="event">
      <div className={`color-dot ${eventColor}`}></div>
      <div className="event-time">{startTime}</div>
      <div className="event-name">{eventName}</div>
    </button>
  );
}
