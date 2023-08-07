import { useRef, type ReactElement, type FormEvent, useReducer } from "react";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import { Form } from "./Form/Form";
import { formState } from "../../types/Modal_FormGroupProps";
import { EventModalReducer } from "../../reducers/EventModalReducer";
import { useAtom } from "jotai";

import { eventsAtom } from "../../contexts/events";

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
  const modalRef = useRef(null);
  const handleEventModal = () => setIsModalOpened(false);

  const [, setEventsArray] = useAtom(eventsAtom);

  const [state, dispatch] = useReducer(EventModalReducer, {
    eventName: eventName,
    isAllDayChecked: isAllDayChecked,
    eventColor: eventColor,
    startTime: startTime,
    endTime: endTime,
  } as formState);

  function updateEventsArray() {
    const updatedEvent: event = {
      ...state,
      id,
      eventDate,
    };
    setEventsArray((prev) => {
      const withoutOldEvent = prev.filter(
        (event) => event.id != updatedEvent.id,
      );
      return [...withoutOldEvent, updatedEvent];
    });
  }

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCloseBtn(handleEventModal, modalRef);
    updateEventsArray();
  }
  function handleDelete() {
    function handleClose() {
      setIsModalOpened(false);
      setEventsArray((prev) => prev.filter((event) => event.id != id));
    }

    handleCloseBtn(handleClose, modalRef);
  }

  return (
    <>
      <div ref={modalRef} className="modal opening">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>Add Event</div>
            <small>{eventDate}</small>
            <button
              onClick={() => handleCloseBtn(handleEventModal, modalRef)}
              type="button"
              className="close-btn">
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
