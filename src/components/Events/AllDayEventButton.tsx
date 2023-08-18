import { type ReactElement } from "react";

export function AllDayEventButton(props: EventButtonProps): ReactElement {
  const { id, eventColor, isAllDayChecked, eventName, startTime, handleClick } =
    props;

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        id={id}
        data-is_all_day_checked={isAllDayChecked}
        data-start_time={startTime}
        className={`all-day-event ${eventColor} event`}>
        <div className="event-name">{eventName}</div>
      </button>
    </>
  );
}
