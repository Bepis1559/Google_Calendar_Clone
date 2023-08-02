import { Dispatch, type FormEvent } from "react";
import { type formState } from "../../types/Modal_FormGroupProps";
import { SetStateAction } from "jotai";

export function handleFormSubmit(
  e: FormEvent<HTMLFormElement>,
  state: formState,
  setAllDayEventsArray: Dispatch<SetStateAction<allDayEvent[]>>,
  setNotAllDayEventsArray: Dispatch<SetStateAction<notAllDayEvent[]>>,
  eventDate_formatted: string,
) {
  e.preventDefault();
  if (state.isAllDayChecked) {
    const newAllDayEvent: allDayEvent = {
      eventColor: state.eventColor,
      eventName: state.eventName,
      eventDate: eventDate_formatted,
    };
    setAllDayEventsArray((prev) => [...prev, newAllDayEvent]);
  } else {
    const newNotAllDayEvent: notAllDayEvent = {
      eventColor: state.eventColor,
      eventName: state.eventName,
      startTime: state.startTime,
      eventDate: eventDate_formatted,
    };

    setNotAllDayEventsArray((prev) => [...prev, newNotAllDayEvent]);
  }
  // console.log("form submitted");
  // console.log("isAllDayChecked : " + state.isAllDayChecked);
  // console.log("eventName : " + state.eventName);
  // console.log("startTime : " + state.startTime);
  // console.log("endTime : " + state.endTime);
  // console.log("eventColor :" + state.eventColor);
  // console.log("event date : " + eventDate_formatted);
}
