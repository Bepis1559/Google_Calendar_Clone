import { type ReactElement } from "react";
import { handleEventModal } from "../../helpers/handleEventModal";

export function AllDayEvent(props: allDayEvent): ReactElement {
  const { eventColor, eventName, index, setIsEventModalOpened } = props;

  const handleClick = () => {
    // console.log(eventColor, eventName, eventDate, index);
    handleEventModal(index, "open", setIsEventModalOpened);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`all-day-event ${eventColor} event`}>
      <div className="event-name">{eventName}</div>
    </button>
  );
}
