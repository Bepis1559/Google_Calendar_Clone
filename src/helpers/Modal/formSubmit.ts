import { Dispatch } from "react";
import { type formState } from "../../types/Modal_FormGroupProps";
import { SetStateAction } from "jotai";

export function handleFormSubmit(
  allDayEvents: allDayEvent[],
  notAllDayEvents: notAllDayEvent[],
  state: formState,
  setAllDayEventsArray: Dispatch<SetStateAction<allDayEvent[]>>,
  setNotAllDayEventsArray: Dispatch<SetStateAction<notAllDayEvent[]>>,
  eventDate_formatted: string,
) {
  const errorMessage = "The event already exists";
  if (state.isAllDayChecked) {
    // it is an all day event
    const { eventColor, eventName } = state;
    const newAllDayEvent: allDayEvent = {
      id: `${eventColor.trim()}--${eventName.trim()}--${eventDate_formatted.trim()}--wholeDay`,
      eventColor: eventColor,
      eventName: eventName.trim(),
      eventDate: eventDate_formatted.trim(),
    };
    if (doesEventExist(allDayEvents, newAllDayEvent)) {
      // if there already is the exact same event
      throw new Error(errorMessage);
    } else {
      setAllDayEventsArray((prev) => [...prev, newAllDayEvent]);
    }
  } else {
    // it is not an all day event
    const { eventColor, eventName, startTime, endTime } = state;

    const newNotAllDayEvent: notAllDayEvent = {
      id: `${eventColor.trim()}--${eventName.trim()}--${startTime.trim()}--${endTime.trim()}--${eventDate_formatted.trim()}--notWholeDay`,
      eventColor: eventColor,
      eventName: eventName.trim(),
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      eventDate: eventDate_formatted.trim(),
    };

    if (doesEventExist(notAllDayEvents, newNotAllDayEvent)) {
      throw new Error(errorMessage);
    } else {
      setNotAllDayEventsArray((prev) => [...prev, newNotAllDayEvent]);
    }
  }
}

function doesEventExist(
  events: allDayEvent[] | notAllDayEvent[],
  { id }: allDayEvent,
) {
  let result = false;
  events.forEach(({ id: eventId }) => {
    if (id == eventId) {
      result = true;
    }
  });

  return result;
}
