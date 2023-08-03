import { type ReactElement } from "react";
import { handleEventModal } from "../../helpers/handleEventModal";
import { AddEventModal } from "../Modal/AddEventModal";

export function AllDayEvent(props: allDayEvent): ReactElement {
  const { eventColor, eventName, eventDate, index, setIsEventModalOpened } =
    props;

  return (
    <button
      onClick={() => handleEventModal(index, "open", setIsEventModalOpened)}
      type="button"
      className={`all-day-event ${eventColor} event`}>
      <div className="event-name">{eventName}</div>
    </button>
  );
}
