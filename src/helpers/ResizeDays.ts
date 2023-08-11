import { type removedEventType } from "../hooks/useResizeDays";

export function handleRemove(
  target: HTMLButtonElement,
  parentElement: HTMLElement,
  removedEvents: removedEventType[],
) {
  if (isIntersecting(target as HTMLButtonElement, parentElement)) {
    const eventToRemove: removedEventType = {
      target: target as HTMLButtonElement,
      parent: parentElement,
    };
    removedEvents.push(eventToRemove);
    target.remove();
  }
}

export function addEventBack(
  removedEvents: removedEventType[],
  target: HTMLButtonElement,
  parentElement: HTMLElement,
) {
  removedEvents.forEach((removedEvent) => {
    if (
      removedEvent.parent.isEqualNode(parentElement) &&
      isTherePlaceForEvent(target as HTMLButtonElement, parentElement)
    ) {
      parentElement.appendChild(removedEvent.target);
    }
  });
}

export function isTherePlaceForEvent(
  target: HTMLButtonElement,
  parentElement: HTMLElement,
) {
  const parentHeight = elementHeight(parentElement);
  const eventHeight = elementHeight(target);
  const childrenHeight = getChildrenHeight(parentElement);

  return parentHeight - childrenHeight > eventHeight;
}

function isIntersecting(child: HTMLButtonElement, parent: HTMLElement) {
  return (
    child.offsetTop + child.offsetHeight >
    parent.offsetTop + parent.offsetHeight
  );
}

function getChildrenHeight(parentElement: HTMLElement) {
  let childrenHeight = 0;
  Array.from(parentElement.children).forEach((child) => {
    childrenHeight += elementHeight(child as HTMLElement);
  });

  return childrenHeight;
}

function elementHeight(element: HTMLElement) {
  return element.getBoundingClientRect().height;
}
