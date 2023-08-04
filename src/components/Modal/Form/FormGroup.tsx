import { type ReactElement } from "react";
import { FormGroupProps } from "../../../types/Modal_FormGroupProps";

export function FormGroup({
  labelContent,
  dispatch,
  value,
  dispatchType,
  ...props
}: FormGroupProps): ReactElement {
  const { name } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{labelContent}</label>
      <input
        onChange={(e) =>
          dispatch({
            type: dispatchType,
            payload: { value: e.target.value },
          })
        }
        {...props}
        value={value}
        required
        id={name}
      />
    </div>
  );
}
