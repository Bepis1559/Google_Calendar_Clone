import { type ReactElement } from "react";
import { FormGroup_CheckBoxProps } from "../../types/Modal_FormGroupProps";

export function FormGroup_CheckBox({
  labelContent,
  dispatchType,
  dispatch,
  ...props
}: FormGroup_CheckBoxProps): ReactElement {
  const { name } = props;

  return (
    <div className="form-group checkbox">
      <input
        onChange={(e) =>
          dispatch({
            type: dispatchType,
            payload: { value: e.target.checked },
          })
        }
        {...props}
        id={name}
      />
      <label htmlFor={name}>{labelContent}</label>
    </div>
  );
}
