import { type ReactElement } from "react";

type props = {
  numOfHiddenEvents: number;
};

export function ShowMoreEventsButton({
  numOfHiddenEvents,
}: props): ReactElement {
  return (
    <>
      <button type="button" className="events-view-more-btn">
        +{numOfHiddenEvents} More
      </button>
    </>
  );
}
