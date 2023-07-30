import { type ReactElement } from "react";
import { FormGroupProps } from "../../types/Modal_FormGroupProps";

export function FormGroup({
  inputName,
  labelContent,
  inputType,
}: FormGroupProps): ReactElement {
  return (
    <div className="form-group">
      <label htmlFor={inputName}>{labelContent}</label>
      <input type={inputType} name={inputName} id={inputName} />
    </div>
  );
}
