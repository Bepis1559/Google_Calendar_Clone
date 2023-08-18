import { formState } from "../../types/Modal_FormGroupProps";
import type { Dispatch, SetStateAction } from "react";

export function updateEvents(
  state: formState,
  id: string,
  eventDate: string,
  setEvents: Dispatch<SetStateAction<event[]>>,
) {
  const updatedEvent: event = {
    ...state,
    id,
    eventDate,
  };
  setEvents((prev) => {
    const withoutOldEvent = prev.filter((event) => event.id != updatedEvent.id);
    return [...withoutOldEvent, updatedEvent];
  });
}
