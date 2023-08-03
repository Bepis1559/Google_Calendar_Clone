import { Dispatch, FormEvent, type ReactElement } from "react";
import { FormGroup } from "./FormGroup";
import { FormGroup_CheckBox } from "./FormGroup_CheckBox";
import { RowInput } from "./RowInput";
import type {
  formState,
  reducerAction,
} from "../../types/Modal_FormGroupProps";

type propsType = {
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  dispatch: Dispatch<reducerAction>;
  state: formState;
};

export function Form(props: propsType): ReactElement {
  const {
    onFormSubmit,
    dispatch,
    state: { eventName, isAllDayChecked, startTime, endTime },
  } = props;
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <FormGroup
          value={eventName}
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
          checked={isAllDayChecked}
          name="all-day"
          labelContent="All Day?"
        />
        <div className="row">
          <FormGroup
            value={startTime}
            dispatch={dispatch}
            dispatchType="setStartTime"
            max={endTime}
            type="time"
            disabled={isAllDayChecked}
            name="start-time"
            labelContent="Start Time"
          />
          <FormGroup
            value={endTime}
            min={startTime}
            dispatch={dispatch}
            dispatchType="setEndTime"
            type="time"
            disabled={isAllDayChecked}
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
    </>
  );
}