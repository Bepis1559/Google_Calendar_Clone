import { SetStateAction } from "jotai";
import { Dispatch } from "react";

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
  setRemovedEvents: Dispatch<SetStateAction<removedEventType[]>>,
) {
  const lastEvent = day.children[day.children.length - 1] as HTMLButtonElement;
  const shouldEventBeRemoved = isIntersecting(lastEvent, day);
  if (shouldEventBeRemoved) {
    lastEvent.remove();
    const removedEventToPush: removedEventType = {
      event: lastEvent,
      parent: day,
    };

    setRemovedEvents((prev) => {
      prev.unshift(removedEventToPush);
      return prev;
    });
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

export function addEventBack(
  day: HTMLDivElement,
  removedEvents: removedEventType[],
  setRemovedEvents: Dispatch<SetStateAction<removedEventType[]>>,
) {
  let eventToAddBack: HTMLButtonElement;
  removedEvents.forEach(({ event, parent }) => {
    if (day.id == parent.id) {
      day.append(event);
      eventToAddBack = event;
    }
  });
  setRemovedEvents((prev) =>
    prev.filter(({ event: { id } }) => id != eventToAddBack.id),
  );
}

export function areThereAnyRemovedEventsFromThatDay(
  day: HTMLDivElement,
  removedEvents: removedEventType[],
) {
  const daysIdsContainingRemovedEvents = removedEvents.map(
    (removedEvent) => removedEvent.parent.id,
  );
  return daysIdsContainingRemovedEvents.includes(day.id);
}

export function isTherePlaceForEvent(day: HTMLElement) {
  const parentHeight = getElementHeight(day);
  let eventHeight = 0;
  Array.from(day.children).forEach((child) => {
    if (child.tagName == "BUTTON") {
      eventHeight = getElementHeight(child);
      return;
    }
  });

  const childrenHeight = getChildrenHeight(day);

  const result = parentHeight - childrenHeight > 2 * eventHeight;

  return result;
}

export function syncEventsStateAndRemovedEventsArr(
  removedEvents: removedEventType[],
  events: event[],
  setRemovedEvents: Dispatch<SetStateAction<removedEventType[]>>,
) {
  // if an eventId isn't present in the events array , but
  // it is in the removedEvents , remove it also from the
  // removedEvents array, since it has been removed from
  // storage and state
  const removedEventsIds = removedEvents.map(({ event: { id } }) => id);
  const eventsIds = events.map(({ id }) => id);
  removedEventsIds.forEach((id) => {
    if (!eventsIds.includes(id)) {
      const index = removedEvents.findIndex(
        ({ event: { id: eventId } }) => eventId === id,
      );
      if (index !== -1) {
        setRemovedEvents((prev) => {
          prev.splice(index, 1);
          return prev;
        });
      }
    }
  });
}

// non-exported functions

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
