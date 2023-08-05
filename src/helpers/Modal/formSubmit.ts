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
      eventColor: eventColor,
      eventName: eventName.trim(),
      eventDate: eventDate_formatted.trim(),
    };
    if (allDayEventExists(allDayEvents, newAllDayEvent)) {
      // if there already is the exact same event
      throw new Error(errorMessage);
    } else {
      setAllDayEventsArray((prev) => [...prev, newAllDayEvent]);
    }
  } else {
    // it is not an all day event
    const { eventColor, eventName, startTime, endTime } = state;

    const newNotAllDayEvent: notAllDayEvent = {
      eventColor: eventColor,
      eventName: eventName.trim(),
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      eventDate: eventDate_formatted.trim(),
    };

    if (notAllDayEventExists(notAllDayEvents, newNotAllDayEvent)) {
      throw new Error(errorMessage);
    } else {
      setNotAllDayEventsArray((prev) => [...prev, newNotAllDayEvent]);
    }
  }
}

function allDayEventExists(
  allDayEvents: allDayEvent[],
  { eventColor, eventName, eventDate }: allDayEvent,
) {
  let result = false;
  allDayEvents.forEach((event) => {
    if (
      event.eventColor == eventColor &&
      event.eventName == eventName &&
      event.eventDate == eventDate
    ) {
      result = true;
    }
  });

  return result;
}
function notAllDayEventExists(
  notAllDayEvents: notAllDayEvent[],
  { eventColor, eventName, eventDate, startTime, endTime }: notAllDayEvent,
) {
  let result = false;
  notAllDayEvents.forEach((event) => {
    if (
      event.eventColor == eventColor &&
      event.eventName == eventName &&
      event.eventDate == eventDate &&
      event.startTime == startTime &&
      event.endTime == endTime
    ) {
      result = true;
    }
  });

  return result;
}
