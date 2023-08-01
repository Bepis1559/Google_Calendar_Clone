import { useRef, type ReactElement, useReducer } from "react";
import { FormGroup } from "./FormGroup";
import { FormGroup_CheckBox } from "./FormGroup_CheckBox";
import { Button } from "../Button";
import { RowInput } from "./RowInput";
import { handleCloseBtn } from "../../helpers/handleModalCloseButton";

export type reducerAction = {
  type: "setIsAllDayChecked" | "setName" | "setStartTime" | "setEndTime";
  payload?: {
    value: string | boolean;
  };
};
type formState = {
  isAllDayChecked: boolean;
  eventName: string;
  startTime: string;
  endTime: string;
};

export function AddEventModal({
  handleCloseEventModal,
  date,
}: AddEventModalProps): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);

  function reducer(state: formState, { type, payload }: reducerAction) {
    const { value } = payload ?? {};
    switch (type) {
      case "setIsAllDayChecked":
        return { ...state, isAllDayChecked: value as boolean };
      case "setName":
        return { ...state, eventName: value as string };
      case "setStartTime":
        return { ...state, startTime: value as string };
      case "setEndTime":
        return { ...state, endTime: value as string };
      default:
        throw new Error(
          "Something went wrong with the reducer in the modal form",
        );
    }
  }
  const initialState: formState = {
    isAllDayChecked: false,
    eventName: "",
    startTime: "",
    endTime: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

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
          <form>
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
                type="time"
                disabled={state.isAllDayChecked}
                name="start-time"
                labelContent="Start Time"
              />
              <FormGroup
                value={state.endTime}
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
                <RowInput inputId="blue" defaultChecked={true} />
                <RowInput inputId="red" />
                <RowInput inputId="green" />
              </div>
            </div>
            <div className="row">
              <button className="btn btn-success" type="submit">
                Add
              </button>
              <button className="btn btn-delete" type="button">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
