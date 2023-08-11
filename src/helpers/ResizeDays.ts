import { type removedEventType } from "../hooks/useResizeDays";

export function handleRemove(
  target: HTMLButtonElement,
  parentElement: HTMLElement,
  removedEvents: removedEventType[],
) {
  if (isIntersecting(target as HTMLButtonElement, parentElement)) {
    const eventToRemove: removedEventType = {
      event: target as HTMLButtonElement,
      parent: parentElement,
    };
    removedEvents.push(eventToRemove);
    target.remove();
    console.log(removedEvents);
  }
}

export function isTherePlaceForEvent(parentElement: HTMLElement) {
  const parentHeight = parentElement.getBoundingClientRect().height;
  let childrenHeight = 0;
  let eventHeight = 0;
  // let eventMargin_Bottom = 0;
  Array.from(parentElement.children).forEach((child) => {
    childrenHeight += child.getBoundingClientRect().height;
    if (child.tagName == "BUTTON") {
      eventHeight = child.getBoundingClientRect().height;
    }
  });

  return parentHeight - childrenHeight > eventHeight;
}

function isIntersecting(child: HTMLButtonElement, parent: HTMLElement) {
  return (
    child.offsetTop + child.offsetHeight >
    parent.offsetTop + parent.offsetHeight
  );
}
