import { Dispatch, type FormEvent } from "react";
import { type formState } from "../../types/Modal_FormGroupProps";
import { SetStateAction } from "jotai";

export function handleFormSubmit(
  allDayEvents: allDayEvent[],
  notAllDayEvents: notAllDayEvent[],
  e: FormEvent<HTMLFormElement>,
  state: formState,
  setAllDayEventsArray: Dispatch<SetStateAction<allDayEvent[]>>,
  setNotAllDayEventsArray: Dispatch<SetStateAction<notAllDayEvent[]>>,
  eventDate_formatted: string,
) {
  if (state.isAllDayChecked) {
    // it is an all day event
    const { eventColor, eventName } = state;
    const newAllDayEvent: allDayEvent = {
      eventColor: eventColor,
      eventName: eventName,
      eventDate: eventDate_formatted,
    };
    if (allDayEventExists(allDayEvents, newAllDayEvent)) {
      // if there already is the exact same event
      throw new Error("The exact same event already exists");
    } else {
      setAllDayEventsArray((prev) => [...prev, newAllDayEvent]);
    }
  } else {
    const newNotAllDayEvent: notAllDayEvent = {
      eventColor: state.eventColor,
      eventName: state.eventName,
      startTime: state.startTime,
      eventDate: eventDate_formatted,
    };

    setNotAllDayEventsArray((prev) => [...prev, newNotAllDayEvent]);
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
