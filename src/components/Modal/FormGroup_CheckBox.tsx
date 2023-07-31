import { type ReactElement } from "react";
import { FormGroup_CheckBoxProps } from "../../types/Modal_FormGroupProps";

export function FormGroup_CheckBox({
  
  labelContent,
  handleOnChange,
  ...props
}: FormGroup_CheckBoxProps): ReactElement {

  const {name} = props

  return (
    <div className="form-group checkbox">
      <input
        onChange={() => handleOnChange((prev) => !prev)}
        {...props}
        id={name}
      />
      <label htmlFor={name}>{labelContent}</label>
    </div>
  );
}
