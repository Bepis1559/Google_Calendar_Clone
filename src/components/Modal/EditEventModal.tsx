import { useRef, type ReactElement, type FormEvent, useReducer } from "react";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import { Form } from "./Form/Form";
import { formState } from "../../types/Modal_FormGroupProps";
import { EventModalReducer } from "../../reducers/EventModalReducer";
import { useAtom } from "jotai";
import { allDayEventsArrayAtom } from "../../contexts/events";

export function EditEventModal({
  event: { eventColor, eventName, eventDate, id },
  setIsModalOpened,
}: EditEventModalProps): ReactElement {
  const modalRef = useRef(null);
  const handleEventModal = () => setIsModalOpened(false);
  const [allDayEventsArray] = useAtom(allDayEventsArrayAtom);

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCloseBtn(handleEventModal, modalRef);

    allDayEventsArray.forEach((event) => {
      if (event.id == id) {
        console.log(event);
      }
    });
  }

  const [state, dispatch] = useReducer(EventModalReducer, {
    eventName: eventName,
    isAllDayChecked: true,
    eventColor: eventColor,
    startTime: "",
    endTime: "",
  } as formState);

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
            formPurpose="Edit"
            onFormSubmit={onFormSubmit}
            dispatch={dispatch}
            state={state}
          />
        </div>
      </div>
    </>
  );
}
