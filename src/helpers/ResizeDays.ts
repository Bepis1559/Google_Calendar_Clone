import { type SetStateAction } from "react";
import { type Dispatch } from "react";

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
export const handleIdsOfRemovedEvents = (
  setIdsOfDaysWithEventsRemoved: Dispatch<SetStateAction<string[]>>,
  removedEvents: removedEventType[],
) =>
  setIdsOfDaysWithEventsRemoved(removedEvents.map(({ parent: { id } }) => id));
// removing event related
export function handleRemove(
  day: HTMLDivElement,
  lastEvent: HTMLButtonElement,
  setRemovedEvents: Dispatch<SetStateAction<removedEventType[]>>,
) {
  setRemovedEvents((prev) => {
    const event: removedEventType = {
      event: lastEvent,
      parent: day,
    };
    prev.unshift(event);
    return prev;
  });
  lastEvent.remove();
}
export function isIntersecting(child: HTMLButtonElement, parent: HTMLElement) {
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
  const eventToAddBack = removedEvents.find(
    ({ parent }) => day.id == parent.id,
  );
  setRemovedEvents((prev) =>
    prev.filter(({ event: { id } }) => id != eventToAddBack?.event.id),
  );
  const lastEvent = getLastButtonEvent(day);
  lastEvent.insertAdjacentElement(
    "afterend",
    eventToAddBack?.event as HTMLButtonElement,
  );
  // day.append(eventToAddBack?.event as HTMLButtonElement);
}

export function getLastButtonEvent(day: HTMLDivElement) {
  const events_buttons = day.querySelectorAll("button.event");
  const lastEvent = events_buttons[events_buttons.length - 1];
  return lastEvent as HTMLButtonElement;
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
