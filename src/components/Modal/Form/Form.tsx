import { Dispatch, FormEvent, type ReactElement } from "react";
import { FormGroup } from "./FormGroup";
import { FormGroup_CheckBox } from "./FormGroup_CheckBox";
import { RowInput } from "../RowInput";
import type {
  formState,
  reducerAction,
} from "../../../types/Modal_FormGroupProps";
import { useAtom } from "jotai";
import { formErrorAtom } from "../../../contexts/Modal";
import { DeleteButton } from "./DeleteButton";
import { SaveButton } from "./SaveButton";
import { AddButton } from "./AddButton";
type propsType = {
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  dispatch: Dispatch<reducerAction>;
  state: formState;
  formPurpose: "Add" | "Edit";
};

export function Form(props: propsType): ReactElement {
  const [formError] = useAtom(formErrorAtom);
  const {
    onFormSubmit,
    dispatch,
    state: { eventName, isAllDayChecked, startTime, endTime, eventColor },
    formPurpose,
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
              defaultChecked={eventColor == "blue"}
            />
            <RowInput
              defaultChecked={eventColor == "red"}
              dispatch={dispatch}
              inputId="red"
            />
            <RowInput
              defaultChecked={eventColor == "green"}
              dispatch={dispatch}
              inputId="green"
            />
          </div>
        </div>
        <div className="row">
          {formError ? (
            <button className="btn btn-delete" type="button">
              {formError}
            </button>
          ) : formPurpose == "Edit" ? (
            <SaveButton />
          ) : (
            <AddButton />
          )}

          {formPurpose == "Edit" ? <DeleteButton /> : null}
        </div>
      </form>
    </>
  );
}
