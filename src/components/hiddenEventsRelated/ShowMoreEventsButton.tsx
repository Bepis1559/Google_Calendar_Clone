import type { Dispatch, SetStateAction, ReactElement } from "react";
import { handleEventModal } from "../../helpers/handleEventModal";

type props = {
  numOfHiddenEvents: number;
  dayIndex: number;
  isMoreEventsModalOpened: boolean;
  setIsMoreEventsModalOpened: Dispatch<SetStateAction<boolean[]>>;
};

export function ShowMoreEventsButton({
  numOfHiddenEvents,
  dayIndex,
  setIsMoreEventsModalOpened,
}: props): ReactElement {
  return (
    <>
      <button
        onClick={() =>
          handleEventModal(dayIndex, "open", setIsMoreEventsModalOpened)
        }
        type="button"
        className="events-view-more-btn">
        +{numOfHiddenEvents} More
      </button>
    </>
  );
}
