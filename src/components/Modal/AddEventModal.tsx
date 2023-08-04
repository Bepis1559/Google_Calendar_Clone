import { useRef, type ReactElement, useReducer, type FormEvent } from "react";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import type { formState } from "../../types/Modal_FormGroupProps";
import { AddEventModalReducer } from "../../reducers/AddEventModalReducer";
import { useAtom } from "jotai";
import {
  allDayEventsArrayAtom,
  notAllDayEventsArrayAtom,
} from "../../contexts/events";
import { handleFormSubmit } from "../../helpers/Modal/formSubmit";
import { type AddEventModalProps } from "../../types/Modals";
import { Modal } from "./Modal";

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
