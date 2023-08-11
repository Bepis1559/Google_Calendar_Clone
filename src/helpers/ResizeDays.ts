import { type removedEventType } from "../hooks/useResizeDays";

export function handleRemove(
  target: HTMLButtonElement,
  parentElement: HTMLElement,
  removedEvents: removedEventType[],
  currentEventsObserver: ResizeObserver,
  removedEventsObserver: ResizeObserver,
) {
  if (isIntersecting(target as HTMLButtonElement, parentElement)) {
    const eventToRemove: removedEventType = {
      target: target as HTMLButtonElement,
      parent: parentElement,
    };

    removedEvents.push(eventToRemove);
    target.remove();
    currentEventsObserver.unobserve(target);
    removedEventsObserver.observe(target);
  }
}

export function addEventBack(
  removedEvents: removedEventType[],
  target: HTMLButtonElement,

  currentEventsObserver: ResizeObserver,
  removedEventsObserver: ResizeObserver,
) {
  removedEvents.forEach((removedEvent) => {
    if (
      removedEvent.parent.isEqualNode(removedEvent.parent) &&
      isTherePlaceForEvent(target as HTMLButtonElement, removedEvent.parent)
    ) {
      console.log("trying to add event back");
      removedEvent.parent.appendChild(removedEvent.target);
      removedEventsObserver.unobserve(target);
      currentEventsObserver.observe(removedEvent.target);
    }
  });
}

function isTherePlaceForEvent(
  target: HTMLButtonElement,
  parentElement: HTMLElement,
) {
  const parentHeight = elementHeight(parentElement);
  const eventHeight = elementHeight(target);
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
    childrenHeight += elementHeight(child as HTMLElement);
  });

  return childrenHeight;
}

function elementHeight(element: HTMLElement) {
  return element.getBoundingClientRect().height;
}

export function currentEventsObserverCallBack(
  entries: ResizeObserverEntry[],
  removedEvents: removedEventType[],
  currentEventsObserver: ResizeObserver,
  removedEventsObserver: ResizeObserver,
) {
  entries.forEach(({ target }) => {
    const { parentElement } = target;
    if (parentElement) {
      handleRemove(
        target as HTMLButtonElement,
        parentElement,
        removedEvents,
        currentEventsObserver,
        removedEventsObserver,
      );
    }
  });
}
