import { type ReactElement } from "react";
import { FormGroupProps } from "../../types/Modal_FormGroupProps";

export function FormGroup({
  inputName,
  labelContent,
  inputType = "time",
}: FormGroupProps): ReactElement {
  return (
    <div className="form-group">
      <label htmlFor={inputName}>{labelContent}</label>
      <input required type={inputType} name={inputName} id={inputName} />
    </div>
  );
}
