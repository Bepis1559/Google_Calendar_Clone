import { useState, type ReactElement } from "react";
import { allDayEventsArrayAtom } from "../../contexts/events";
import { useAtom } from "jotai";
import { EditEventModal } from "../Modal/EditEventModal";

export function AllDayEvent(props: allDayEvent): ReactElement {
  const { eventColor, eventName, eventDate } = props;
  const [allDayEventsArray] = useAtom(allDayEventsArrayAtom);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<allDayEvent | null>(null);
  function handleClick() {
    allDayEventsArray.forEach((allDayEvent) => {
      if (
        eventColor == allDayEvent.eventColor &&
        eventName == allDayEvent.eventName &&
        eventDate == allDayEvent.eventDate
      ) {
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
