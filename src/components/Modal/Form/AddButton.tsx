import { type ReactElement } from "react";

export function AddButton(): ReactElement {
  return (
    <>
      <button className="btn btn-success" type="submit">
        Add
      </button>
    </>
  );
}
