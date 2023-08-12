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
    removedEvents.unshift(removedEventToPush);
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
) {
  removedEvents.forEach(({ event, parent }) => {
    if (day.id == parent.id) {
      day.append(event);
      removedEvents = removedEvents.filter((el) => el.event.id != event.id);
    }
  });
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
        removedEvents.splice(index, 1);
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
