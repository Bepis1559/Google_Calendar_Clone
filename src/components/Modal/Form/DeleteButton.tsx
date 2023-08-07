import { type ReactElement } from "react";

type props = {
  handleDelete: () => void;
};

export function DeleteButton({ handleDelete }: props): ReactElement {
  return (
    <>
      <button onClick={handleDelete} className="btn btn-delete" type="button">
        Delete
      </button>
    </>
  );
}
