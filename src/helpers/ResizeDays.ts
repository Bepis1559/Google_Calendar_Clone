import { type removedEventType } from "../hooks/useResizeDays";

export function hadleObserving(
  divElements_days: HTMLDivElement[],
  daysDivsObserver: ResizeObserver,
) {
  divElements_days.forEach((div) => {
    Array.from(div?.children).forEach((child) => {
      if (child.tagName == "BUTTON") {
        daysDivsObserver.observe(div);
      }
    });
  });
}

// removing event related
export function handleRemove(
  day: HTMLDivElement,
  removedEvents: removedEventType[],
) {
  const lastEvent = day.children[day.children.length - 1] as HTMLButtonElement;
  const shouldEventBeRemoved = isIntersecting(lastEvent, day);
  if (shouldEventBeRemoved) {
    lastEvent.remove();
    const removedEventToPush: removedEventType = {
      event: lastEvent,
      parent: day,
    };
    removedEvents.push(removedEventToPush);
  }
}
function isIntersecting(child: HTMLButtonElement, parent: HTMLElement) {
  return (
    child.offsetTop + child.offsetHeight >
    parent.offsetTop + parent.offsetHeight
  );
}

//
//
//
//
//
//
//
// adding event back related

function handleAddEventBack() {}

export function isTherePlaceForEvent(day: HTMLElement) {
  const parentHeight = getElementHeight(day);
  let eventHeight = 0;
  Array.from(day.children).forEach((child) => {
    if (child.tagName == "BUTTON") {
      eventHeight = getElementHeight(child);
      // marginBlockEnd = parseFloat(getComputedStyle(child).marginBlockEnd);
      return;
    }
  });

  const childrenHeight = getChildrenHeight(day);

  const result = parentHeight - childrenHeight > 2 * eventHeight;

  return result;
}

function getChildrenHeight(parentElement: HTMLElement) {
  let childrenHeight = 0;
  Array.from(parentElement.children).forEach((child) => {
    childrenHeight += getElementHeight(child as HTMLElement);
  });

  return childrenHeight;
}

function getElementHeight(element: HTMLElement | Element) {
  return element.getBoundingClientRect().height;
}
