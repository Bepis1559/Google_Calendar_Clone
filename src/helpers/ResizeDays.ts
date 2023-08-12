import { type removedEventType } from "../hooks/useResizeDays";

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

// export function addEventBack(
//   removedEvents: removedEventType[],
//   target: HTMLButtonElement,
//   currentEventsObserver: ResizeObserver,
//   removedEventsObserver: ResizeObserver,
// ) {
//   console.log("addEventBack called");
//   const hasEventBeenRemoved = doesArrayContainById(removedEvents, target.id);
//   removedEvents.forEach((event) => {
//     if (isTherePlaceForEvent(event.parent!) && hasEventBeenRemoved) {
//       event.parent?.appendChild(target);
//       removedEventsObserver.unobserve(target);
//       currentEventsObserver.observe(target);
//     }
//   });
// }

function isTherePlaceForEvent(parentElement: HTMLElement) {
  const parentHeight = getElementHeight(parentElement);
  let eventHeight = 0;
  Array.from(parentElement.children).forEach((child) => {
    if (child.tagName == "BUTTON") {
      eventHeight = getElementHeight(child);
      return;
    }
  });
  const childrenHeight = getChildrenHeight(parentElement);

  const result = parentHeight - childrenHeight > eventHeight;

  return result;
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
    childrenHeight += getElementHeight(child as HTMLElement);
  });

  return childrenHeight;
}

function getElementHeight(element: HTMLElement | Element) {
  return element.getBoundingClientRect().height;
}

export function hadleObserving(
  divElements_days: HTMLDivElement[],
  daysDivsObserver: ResizeObserver,
) {
  divElements_days.forEach((div) => {
    Array.from((div as Element)?.children).forEach((child) => {
      if (child.tagName == "BUTTON") {
        daysDivsObserver.observe(div as Element);
      }
    });
  });
}
