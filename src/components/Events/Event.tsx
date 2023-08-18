import { useState, type ReactElement, forwardRef, ForwardedRef } from "react";
import { eventsAtom } from "../../contexts/events";
import { useAtom } from "jotai";
import { EditEventModal } from "../Modal/EditEventModal";
import { AllDayEventButton } from "./AllDayEventButton";
import { NotAllDayEventButton } from "./NotAllDayEventButton";
import { useSortButtons } from "../../hooks/useSortButtons";

export function Inner(
  props: event,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const { id, isAllDayChecked } = props;
  const [events] = useAtom(eventsAtom);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<event | null>(null);
  const openModal = () => setIsModalOpened(true);

  function handleClick() {
    const clickedEvent = events.find((event) => event.id === id);
    clickedEvent && setSelectedEvent(clickedEvent);
    openModal();
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
        <AllDayEventButton {...props} handleClick={handleClick} />
      ) : (
        <NotAllDayEventButton {...props} handleClick={handleClick} />
      )}
    </>
  );
}

export const Event = forwardRef(Inner);
