import { type ReactElement } from "react";

export function HeaderButton({
  handleClick,
  classes = "month-change-btn",
  content,
}: HeaderButtonProps): ReactElement {
  return (
    <>
      <button onClick={handleClick} type="button" className={classes}>
        {content}
      </button>
    </>
  );
}
