import { type ReactElement } from "react";

export function RowInput({
  inputId,
  defaultChecked = false,
}: RowInputProps): ReactElement {
  return (
    <>
      <input
        type="radio"
        name="color"
        value={inputId}
        id={inputId}
        defaultChecked={defaultChecked}
        className="color-radio"
      />
      <label htmlFor={inputId}>
        <span className="sr-only">{`${inputId[0].toUpperCase()}${inputId.substring(
          1,
        )}`}</span>
      </label>
    </>
  );
}
