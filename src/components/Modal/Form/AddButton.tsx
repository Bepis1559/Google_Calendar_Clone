import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { formErrorAtom } from "../../../contexts/Modal";

export function AddButton(): ReactElement {
  const [formError] = useAtom(formErrorAtom);

  return (
    <>
      <button
        className={`btn btn-${formError ? "delete" : "success"}`}
        type="submit">
        Add
      </button>
    </>
  );
}
