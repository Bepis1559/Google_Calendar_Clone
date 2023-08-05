import { useState, type ReactElement } from "react";
import { allDayEventsArrayAtom } from "../../contexts/events";
import { useAtom } from "jotai";
import { EditEventModal } from "../Modal/EditEventModal";

export function AllDayEvent(props: event): ReactElement {
  const { eventColor, eventName, id } = props;
  const [allDayEventsArray] = useAtom(allDayEventsArrayAtom);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<event | null>(null);
  function handleClick() {
    allDayEventsArray.forEach((allDayEvent) => {
      if (allDayEvent.id == id) {
        setSelectedEvent(allDayEvent);
      }
    });
    setIsModalOpened(true);
  }

  return (
    <>
      {isModalOpened && selectedEvent ? (
        <EditEventModal
          setIsModalOpened={setIsModalOpened}
          event={selectedEvent}
        />
      ) : null}
      <button
        onClick={handleClick}
        type="button"
        className={`all-day-event ${eventColor} event`}>
        <div className="event-name">{eventName}</div>
      </button>
    </>
  );
}
