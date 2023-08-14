import type { Dispatch, SetStateAction } from "react";

export function sortVisibleEvents(
  setEventsArray: Dispatch<SetStateAction<event[]>>,
  removedEvents: removedEventType[],
) {
  setEventsArray((prev) => {
    // Find the visible events
    const visibleEvents = prev.filter(
      (event) =>
        !removedEvents.some(
          (removedEvent) => event.id === removedEvent.event.id,
        ),
    );

    // Sort the visible events
    const sortedVisibleEvents = [...visibleEvents].sort((a, b) => {
      if (a.isAllDayChecked && !b.isAllDayChecked) {
        return -1;
      } else if (!a.isAllDayChecked && b.isAllDayChecked) {
        return 1;
      } else if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      } else {
        return 0;
      }
    });

    // Create a new array with the sorted visible events and the rest of the events
    const newEventsArray = prev.map(
      (event) =>
        sortedVisibleEvents.find(
          (sortedEvent) => sortedEvent.id === event.id,
        ) || event,
    );

    return newEventsArray;
  });
}
