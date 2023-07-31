import { type ReactElement } from "react";
import { FormGroupProps } from "../../types/Modal_FormGroupProps";

export function FormGroup({
  labelContent,
  handleOnChange,
  ...props
}: FormGroupProps): ReactElement {

  const {name} = props

  return (
    <div className="form-group">
      <label htmlFor={name}>{labelContent}</label>
      <input onChange={(e) => handleOnChange(e.target.value)} {...props} required id={name} />
    </div> 
  );
}
