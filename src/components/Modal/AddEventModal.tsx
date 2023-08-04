import { useRef, type ReactElement, useReducer, type FormEvent } from "react";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import type { formState } from "../../types/Modal_FormGroupProps";
import { EventModalReducer } from "../../reducers/EventModalReducer";
import { useAtom } from "jotai";
import {
  allDayEventsArrayAtom,
  notAllDayEventsArrayAtom,
} from "../../contexts/events";
import { handleFormSubmit } from "../../helpers/Modal/formSubmit";
import { type AddEventModalProps } from "../../types/Modals";
import { Modal } from "./Modal";
import { formErrorAtom } from "../../contexts/Modal";

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
  const [allDayEventsArray, setAllDayEventsArray] = useAtom(
    allDayEventsArrayAtom,
  );
  const [notAllDayEventsArray, setNotAllDayEventsArray] = useAtom(
    notAllDayEventsArrayAtom,
  );

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      handleFormSubmit(
        allDayEventsArray,
        notAllDayEventsArray,
        e,
        state,
        setAllDayEventsArray,
        setNotAllDayEventsArray,
        date,
      );
      handleCloseBtn(handleEventModal, modalRef);
    } catch (error) {
      const errorMessage = (error as Error)?.message;
      setFormError(errorMessage);
      setTimeout(() => {
        setFormError(null);
      }, 2000);
    }
  };

  return (
    <>
      <Modal
        title="Add Event"
        date={date}
        modalRef={modalRef}
        handleEventModal={handleEventModal}
        onFormSubmit={onFormSubmit}
        dispatch={dispatch}
        state={state}
        ref={modalRef}
      />
    </>
  );
}
