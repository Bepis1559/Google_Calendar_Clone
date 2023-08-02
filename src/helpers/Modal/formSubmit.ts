import { Dispatch, type FormEvent } from "react";
import { type formState } from "../../types/Modal_FormGroupProps";
import { SetStateAction } from "jotai";

export function handleFormSubmit(
  e: FormEvent<HTMLFormElement>,
  state: formState,
  setAllDayEventsArray: Dispatch<SetStateAction<allDayEvent[]>>,
  setNotAllDayEventsArray: Dispatch<SetStateAction<notAllDayEvent[]>>,
) {
  e.preventDefault();
  if (state.isAllDayChecked) {
    const newAllDayEvent: allDayEvent = {
      eventColor: state.eventColor,
      eventName: state.eventName,
    };
    setAllDayEventsArray((prev) => [...prev, newAllDayEvent]);
  } else {
    const newNotAllDayEvent: notAllDayEvent = {
      eventColor: state.eventColor,
      eventName: state.eventName,
      startTime: state.startTime,
    };

    setNotAllDayEventsArray((prev) => [...prev, newNotAllDayEvent]);
  }
  // console.log("isAllDayChecked : " + state.isAllDayChecked);
  // console.log("eventName : " + state.eventName);
  // console.log("startTime : " + state.startTime);
  // console.log("eventColor :" + state.eventColor);
  // console.log("form submitted");
}
