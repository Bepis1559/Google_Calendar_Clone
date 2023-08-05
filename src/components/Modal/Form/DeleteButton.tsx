import { type ReactElement } from "react";

export function DeleteButton(): ReactElement {
  return (
    <>
      <button className="btn btn-delete" type="submit">
        Delete
      </button>
    </>
  );
}
