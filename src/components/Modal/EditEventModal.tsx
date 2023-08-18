import { useRef, type ReactElement, type FormEvent, useReducer } from "react";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import { Form } from "./Form/Form";
import { formState } from "../../types/Modal_FormGroupProps";
import { EventModalReducer } from "../../reducers/EventModalReducer";
import { useAtom } from "jotai";

import { eventsAtom } from "../../contexts/events";
import { updateEvents } from "../../helpers/Modal/updateEvents";

export function EditEventModal({
  event: {
    eventColor,
    eventName,
    eventDate,
    isAllDayChecked,
    startTime,
    endTime,
    id,
  },
  setIsModalOpened,
}: EditEventModalProps): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);

  const [, setEvents] = useAtom(eventsAtom);

  const [state, dispatch] = useReducer(EventModalReducer, {
    eventName: eventName,
    isAllDayChecked: isAllDayChecked,
    eventColor: eventColor,
    startTime: startTime,
    endTime: endTime,
  } as formState);
  const closeModal = () => setIsModalOpened(false);
  const deleteEvent = () => {
    setEvents((prev) => prev.filter((event) => event.id != id));
  };

  const animateClose = () => handleCloseBtn(closeModal, modalRef);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await animateClose();
    updateEvents(state, id, eventDate, setEvents);
  }
  async function handleDelete() {
    await animateClose();
    deleteEvent();
  }

  return (
    <>
      <div ref={modalRef} className="modal opening">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>Edit event</div>
            <small>{eventDate}</small>
            <button onClick={animateClose} type="button" className="close-btn">
              &times;
            </button>
          </div>
          <Form
            eventId={id}
            formPurpose="Edit"
            onFormSubmit={onFormSubmit}
            dispatch={dispatch}
            state={state}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
