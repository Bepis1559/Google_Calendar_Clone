import { useRef, type ReactElement, useReducer, type FormEvent } from "react";
import { Button } from "../Button";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import type { formState } from "../../types/Modal_FormGroupProps";
import { AddEventModalReducer } from "../../reducers/AddEventModalReducer";
import { useAtom } from "jotai";
import {
  allDayEventsArrayAtom,
  notAllDayEventsArrayAtom,
} from "../../contexts/events";
import { handleFormSubmit } from "../../helpers/Modal/formSubmit";
import { Form } from "./Form";

export function AddEventModal({
  handleEventModal,
  date,
}: AddEventModalProps): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(AddEventModalReducer, {
    isAllDayChecked: false,
    eventName: "",
    startTime: "",
    endTime: "",
    eventColor: "blue",
  } as formState);
  const [, setAllDayEventsArray] = useAtom(allDayEventsArrayAtom);
  const [, setNotAllDayEventsArray] = useAtom(notAllDayEventsArrayAtom);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleFormSubmit(
      e,
      state,
      setAllDayEventsArray,
      setNotAllDayEventsArray,
      date,
    );
    handleCloseBtn(handleEventModal, modalRef);
  };

  return (
    <>
      <div ref={modalRef} className="modal opening">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>Add Event</div>
            <small>{date}</small>
            <Button
              handleClick={() => handleCloseBtn(handleEventModal, modalRef)}
              classes="close-btn"
              content="&times;"
            />
          </div>
          <Form onFormSubmit={onFormSubmit} dispatch={dispatch} state={state} />
        </div>
      </div>
    </>
  );
}
