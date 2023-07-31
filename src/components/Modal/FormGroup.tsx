import { type ReactElement } from "react";
import { FormGroupProps } from "../../types/Modal_FormGroupProps";

export function FormGroup({
  labelContent,
  ...props
}: FormGroupProps): ReactElement {

  const {name} = props

  return (
    <div className="form-group">
      <label htmlFor={name}>{labelContent}</label>
      <input {...props}    required   id={name} />
    </div>
  );
}
