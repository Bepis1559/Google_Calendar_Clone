import { useRef, type ReactElement, useReducer, type FormEvent } from "react";
import { FormGroup } from "./FormGroup";
import { FormGroup_CheckBox } from "./FormGroup_CheckBox";
import { Button } from "../Button";
import { RowInput } from "./RowInput";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import type { formState } from "../../types/Modal_FormGroupProps";
import { AddEventModalReducer } from "../../reducers/AddEventModalReducer";
import { useAtom } from "jotai";
import {
  allDayEventsArrayAtom,
  notAllDayEventsArrayAtom,
} from "../../contexts/events";
import { handleFormSubmit } from "../../helpers/Modal/formSubmit";

export function AddEventModal({
  handleCloseEventModal,
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
    handleCloseBtn(handleCloseEventModal, modalRef);
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
              handleClick={() =>
                handleCloseBtn(handleCloseEventModal, modalRef)
              }
              classes="close-btn"
              content="&times;"
            />
          </div>
          <form onSubmit={onFormSubmit}>
            <FormGroup
              value={state.eventName}
              dispatch={dispatch}
              dispatchType="setName"
              name="name"
              labelContent="Name"
              type="text"
            />
            <FormGroup_CheckBox
              type="checkbox"
              dispatch={dispatch}
              dispatchType="setIsAllDayChecked"
              checked={state.isAllDayChecked}
              name="all-day"
              labelContent="All Day?"
            />
            <div className="row">
              <FormGroup
                value={state.startTime}
                dispatch={dispatch}
                dispatchType="setStartTime"
                max={state.endTime}
                type="time"
                disabled={state.isAllDayChecked}
                name="start-time"
                labelContent="Start Time"
              />
              <FormGroup
                value={state.endTime}
                min={state.startTime}
                dispatch={dispatch}
                dispatchType="setEndTime"
                type="time"
                disabled={state.isAllDayChecked}
                name="end-time"
                labelContent="End Time"
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <div className="row left">
                <RowInput
                  dispatch={dispatch}
                  inputId="blue"
                  defaultChecked={true}
                />
                <RowInput dispatch={dispatch} inputId="red" />
                <RowInput dispatch={dispatch} inputId="green" />
              </div>
            </div>
            <div className="row">
              <button className="btn btn-success" type="submit">
                Add
              </button>
              {/* <button className="btn btn-delete" type="button">
                Delete
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
