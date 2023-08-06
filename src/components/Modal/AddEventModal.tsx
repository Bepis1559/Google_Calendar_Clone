import { useRef, type ReactElement, useReducer, type FormEvent } from "react";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import type { formState } from "../../types/Modal_FormGroupProps";
import { EventModalReducer } from "../../reducers/EventModalReducer";
import { useAtom } from "jotai";
import { formErrorAtom } from "../../contexts/Modal";
import { Form } from "./Form/Form";
import { eventsAtom } from "../../contexts/events";

export function AddEventModal({
  handleEventModal,
  date,
}: AddEventModalProps): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);
  const [, setFormError] = useAtom(formErrorAtom);
  const [state, dispatch] = useReducer(EventModalReducer, {
    isAllDayChecked: false,
    eventName: "",
    startTime: "",
    endTime: "",
    eventColor: "blue",
  } as formState);
  const [, setEventsArray] = useAtom(eventsAtom);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      addEvent();
      handleCloseBtn(handleEventModal, modalRef);
    } catch (error) {
      const errorMessage = (error as Error)?.message;
      setFormError(errorMessage);
      setTimeout(() => {
        setFormError(null);
      }, 2000);
    }
  };

  function addEvent() {
    const newEvent: event = {
      id: crypto.randomUUID(),
      eventDate: date.trim(),
      ...state,
    };

    setEventsArray((prev) => [...prev, newEvent]);
  }

  return (
    <>
      <div ref={modalRef} className="modal opening">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>Add Event</div>
            <small>{date}</small>
            <button
              onClick={() => handleCloseBtn(handleEventModal, modalRef)}
              type="button"
              className="close-btn">
              &times;
            </button>
          </div>
          <Form
            formPurpose="Add"
            onFormSubmit={onFormSubmit}
            dispatch={dispatch}
            state={state}
          />
        </div>
      </div>
    </>
  );
}
