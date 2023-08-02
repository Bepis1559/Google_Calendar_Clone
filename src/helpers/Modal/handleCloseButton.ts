import { type RefObject } from "react";
const root = document.documentElement;
const animationDuration = getComputedStyle(root)
  .getPropertyValue("--modalAnimationDuration")
  .trim();
export function handleCloseBtn(
  handleCloseEventModal: () => void,
  modalRef: RefObject<HTMLDivElement>,
) {
  if (modalRef) {
    modalRef.current?.classList.remove("opening");
    modalRef.current?.classList.add("closing");
  }

  setTimeout(() => {
    handleCloseEventModal();
  }, parseInt(animationDuration));
}
