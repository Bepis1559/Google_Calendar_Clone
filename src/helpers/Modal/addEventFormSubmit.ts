import { Dispatch } from "react";
import { type formState } from "../../types/Modal_FormGroupProps";
import { SetStateAction } from "jotai";

export function addEventFormSubmit(
  allDayEvents: event[],
  notAllDayEvents: event[],
  state: formState,
  setAllDayEventsArray: Dispatch<SetStateAction<event[]>>,
  setNotAllDayEventsArray: Dispatch<SetStateAction<event[]>>,
  eventDate_formatted: string,
) {
  const errorMessage = "The event already exists";
  if (state.isAllDayChecked) {
    // it is an all day event
    const { eventColor, eventName, isAllDayChecked } = state;
    const newAllDayEvent: event = {
      id: crypto.randomUUID(),
      isAllDayChecked: isAllDayChecked,
      startTime: "",
      endTime: "",
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
    const { eventColor, eventName, startTime, endTime, isAllDayChecked } =
      state;

    const newNotAllDayEvent: event = {
      id: crypto.randomUUID(),
      isAllDayChecked: isAllDayChecked,
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
  events: event[],
  {
    eventColor,
    eventName,
    eventDate,
    startTime,
    endTime,
    isAllDayChecked,
  }: event,
) {
  let result = false;
  events.forEach((event) => {
    if (
      event.eventColor == eventColor &&
      event.eventName == eventName &&
      event.eventDate == eventDate &&
      event.startTime == startTime &&
      event.endTime == endTime &&
      event.isAllDayChecked == isAllDayChecked
    ) {
      result = true;
    } else {
      result = false;
    }
  });
  return result;
}
