import { type ReactElement } from "react";

export function AllDayEventButton({
  handleClick,
  eventColor,
  eventName,
  eventId,
}: EventButtonProps): ReactElement {
  return (
    <>
      <button
        id={eventId}
        onClick={handleClick}
        type="button"
        className={`all-day-event ${eventColor} event`}>
        <div className="event-name">{eventName}</div>
      </button>
    </>
  );
}
