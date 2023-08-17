import { type ReactElement } from "react";

export function AllDayEventButton(props: EventButtonProps): ReactElement {
  const {
    id,
    eventColor,
    isAllDayChecked,
    eventName,
    eventDate,
    startTime,
    endTime,
    handleClick,
  } = props;
  return (
    <>
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
        className={`all-day-event ${eventColor} event`}>
        <div className="event-name">{eventName}</div>
      </button>
    </>
  );
}
