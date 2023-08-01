import { type ReactElement } from "react";

export function AllDayEvent(): ReactElement {
  return (
    <button type="button" className="all-day-event blue event">
      <div className="event-name">Long Event Name That Just Keeps Going</div>
    </button>
  );
}
