import { type formState } from "../../types/Modal_FormGroupProps";
import { Dispatch, SetStateAction } from "react";

export function editEventFormSubmit(
  allDayEventsArray: event[],
  notAllDayEventsArray: event[],
  id: string,
  state: formState,
  eventDate: string,
  setNotAllDayEventsArray: Dispatch<SetStateAction<event[]>>,
  setAllDayEventsArray: Dispatch<SetStateAction<event[]>>,
) {
  // Search for the event in both arrays
  const allDayEventIndex = allDayEventsArray.findIndex(
    (event) => event.id === id,
  );
  const notAllDayEventIndex = notAllDayEventsArray.findIndex(
    (event) => event.id === id,
  );

  // Create a new event object with the updated properties
  const updatedEvent: event = {
    ...state,
    id,
    eventDate,
  };

  if (state.isAllDayChecked) {
    // Move the event to the allDayEventsArray
    setAllDayEventsArray((prevEvents) => {
      if (allDayEventIndex !== -1) {
        // The selected event is already in the allDayEventsArray, update its properties
        return prevEvents.map((event, index) =>
          index === allDayEventIndex ? updatedEvent : event,
        );
      } else {
        // The selected event is not in the allDayEventsArray, add it to the array
        return [...prevEvents, updatedEvent];
      }
    });

    // Remove the event from the notAllDayEventsArray if it's present
    if (notAllDayEventIndex !== -1) {
      setNotAllDayEventsArray((prevEvents) =>
        prevEvents.filter((_, index) => index !== notAllDayEventIndex),
      );
    }
  } else {
    // Move the event to the notAllDayEventsArray
    setNotAllDayEventsArray((prevEvents) => {
      if (notAllDayEventIndex !== -1) {
        // The selected event is already in the notAllDayEventsArray, update its properties
        return prevEvents.map((event, index) =>
          index === notAllDayEventIndex ? updatedEvent : event,
        );
      } else {
        // The selected event is not in the notAllDayEventsArray, add it to the array
        return [...prevEvents, updatedEvent];
      }
    });

    // Remove the event from the allDayEventsArray if it's present
    if (allDayEventIndex !== -1) {
      setAllDayEventsArray((prevEvents) =>
        prevEvents.filter((_, index) => index !== allDayEventIndex),
      );
    }
  }
}
