import { useState, type ReactElement, forwardRef, ForwardedRef } from "react";
import { eventsAtom } from "../../contexts/events";
import { useAtom } from "jotai";
import { EditEventModal } from "../Modal/EditEventModal";
import { AllDayEventButton } from "./AllDayEventButton";
import { NotAllDayEventButton } from "./NotAllDayEventButton";
import { useSortButtons } from "../../hooks/useSortButtons";

function Inner(props: event, ref: ForwardedRef<HTMLDivElement>): ReactElement {
  const { eventColor, eventName, id, startTime, isAllDayChecked } = props;
  const [events] = useAtom(eventsAtom);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<event | null>(null);

  function handleClick() {
    const clickedEvent = events.find((event) => event.id === id);
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
    }
    setIsModalOpened(true);
  }

  useSortButtons(ref);

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
          startTime={startTime ?? ""}
        />
      )}
    </>
  );
}

export const Event = forwardRef(Inner);
