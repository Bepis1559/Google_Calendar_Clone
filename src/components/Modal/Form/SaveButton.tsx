import { type ReactElement } from "react";

export function SaveButton(): ReactElement {
  return (
    <>
      <button className="btn btn-success" type="submit">
        Save
      </button>
    </>
  );
}
