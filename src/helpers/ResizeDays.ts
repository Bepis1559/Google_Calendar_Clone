import { type removedEventsType } from "../hooks/useResizeDays";

export function appendEventBackIfPossible(
  removedEvents: removedEventsType[][],
) {
  removedEvents.forEach((day) => {
    day.forEach(({ event, parent }) => {
      const dayLength = day.length;
      if (dayLength && isTherePlaceForEvent(parent)) {
        parent.appendChild(event);
      }
    });
  });
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

export function isIntersecting(child: HTMLButtonElement, parent: HTMLElement) {
  return (
    child.offsetTop + child.offsetHeight >
    parent.offsetTop + parent.offsetHeight
  );
}
