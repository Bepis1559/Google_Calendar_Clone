import { type ReactElement } from "react";
import { FormGroupProps } from "../../types/Modal_FormGroupProps";

export function FormGroup(props : FormGroupProps): ReactElement {

   const {
    name,
    labelContent,
    inputType = "time",
  } = props

  return (
    <div className="form-group">
      <label htmlFor={name}>{labelContent}</label>
      <input name="name" required type={inputType}  id={name} />
    </div>
  );
}
