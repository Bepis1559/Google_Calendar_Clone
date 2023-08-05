import { useRef, type ReactElement, type FormEvent, useReducer } from "react";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import { Form } from "./Form/Form";
import { formState } from "../../types/Modal_FormGroupProps";
import { EventModalReducer } from "../../reducers/EventModalReducer";
import { useAtom } from "jotai";
import {
  allDayEventsArrayAtom,
  notAllDayEventsArrayAtom,
} from "../../contexts/events";
import { editEventFormSubmit } from "../../helpers/Modal/editEventFormSubmit";

export function EditEventModal({
  event: { eventColor, eventName, eventDate, isAllDayChecked, id },
  setIsModalOpened,
}: EditEventModalProps): ReactElement {
  const modalRef = useRef(null);
  const handleEventModal = () => setIsModalOpened(false);
  const [allDayEventsArray, setAllDayEventsArray] = useAtom(
    allDayEventsArrayAtom,
  );
  const [notAllDayEventsArray, setNotAllDayEventsArray] = useAtom(
    notAllDayEventsArrayAtom,
  );

  const [state, dispatch] = useReducer(EventModalReducer, {
    eventName: eventName,
    isAllDayChecked: isAllDayChecked,
    eventColor: eventColor,
    startTime: "",
    endTime: "",
  } as formState);

  function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCloseBtn(handleEventModal, modalRef);
    editEventFormSubmit(
      allDayEventsArray,
      notAllDayEventsArray,
      id,
      state,
      eventDate,
      setNotAllDayEventsArray,
      setAllDayEventsArray,
    );
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
