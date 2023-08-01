import type { ReactElement } from "react";

export function NotAllDayEvent(): ReactElement {
  return (
    <button type="button" className="event">
      <div className="color-dot blue"></div>
      <div className="event-time">7am</div>
      <div className="event-name">Event Name</div>
    </button>
  );
}
