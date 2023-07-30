import { type ReactElement } from "react";
import { FormGroupProps } from "../../types/Modal_FormGroupProps";

export function FormGroup_CheckBox({
  inputName,
  labelContent,
  inputType = "checkbox",
}: FormGroupProps): ReactElement {
  return (
    <div className="form-group checkbox">
      <input type={inputType} name={inputName} id={inputName} />
      <label htmlFor={inputName}>{labelContent}</label>
    </div>
  );
}
