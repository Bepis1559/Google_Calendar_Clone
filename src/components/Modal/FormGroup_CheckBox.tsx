import { type ReactElement } from "react";
import { FormGroup_CheckBoxProps } from "../../types/Modal_FormGroupProps";

export function FormGroup_CheckBox(props : FormGroup_CheckBoxProps): ReactElement {

  const 
  {
    name,
    labelContent,
    inputType = "checkbox",
    checked,
    handleOnChange
  }  = props


  
  return (
    <div className="form-group checkbox">
      <input onChange={() => handleOnChange(prev => !prev) } checked = {checked} name={name} type={inputType} id={name} />
      <label htmlFor={name}>{labelContent}</label>
    </div>
  );
}
