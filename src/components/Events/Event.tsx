import { useState, type ReactElement } from "react";
import { eventsAtom } from "../../contexts/events";
import { useAtom } from "jotai";
import { EditEventModal } from "../Modal/EditEventModal";
import { AllDayEventButton } from "./AllDayEventButton";
import { NotAllDayEventButton } from "./NotAllDayEventButton";

export function Event(props: event): ReactElement {
  const { eventColor, eventName, id, startTime, isAllDayChecked } = props;
  const [eventsArray] = useAtom(eventsAtom);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<event | null>(null);

  function handleClick() {
    const clickedEvent = eventsArray.find((event) => event.id === id);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
    }
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
      {isAllDayChecked ? (
        <AllDayEventButton
          eventId={id}
          handleClick={handleClick}
          eventColor={eventColor}
          eventName={eventName}
        />
      ) : (
        <NotAllDayEventButton
          eventId={id}
          handleClick={handleClick}
          eventColor={eventColor}
          eventName={eventName}
          startTime={startTime!}
        />
      )}
    </>
  );
}
