import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { formErrorAtom } from "../../../contexts/Modal";

export function SaveButton(): ReactElement {
  const [formError] = useAtom(formErrorAtom);

  return (
    <>
      <button
        className={`btn btn-${formError ? "delete" : "success"}`}
        type="submit">
        Save
      </button>
    </>
  );
}
