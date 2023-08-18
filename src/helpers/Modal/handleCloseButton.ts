import { type RefObject } from "react";

function getModalAnimationDuration() {
  const root = document.documentElement;
  const animationDuration = getComputedStyle(root)
    .getPropertyValue("--modalAnimationDuration")
    .trim();

  return animationDuration;
}

export function handleCloseBtn(
  handleEventModal: () => void,
  modalRef: RefObject<HTMLDivElement>,
) {
  if (modalRef) {
    modalRef.current?.classList.remove("opening");
    modalRef.current?.classList.add("closing");
  }
  const animationDuration = getModalAnimationDuration();

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      handleEventModal();
      resolve();
    }, parseInt(animationDuration));
  });
}
