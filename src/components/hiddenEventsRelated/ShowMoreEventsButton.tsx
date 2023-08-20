import { type Dispatch, type SetStateAction, type ReactElement } from "react";
import { handleEventModal } from "../../helpers/handleEventModal";
import { useAtom } from "jotai";
import { idsOfDaysWithEventsRemovedAtom } from "../../contexts/events";
import { CountOccurrencesInArray } from "../../helpers/Days/CountOccurrencesInArray";

type props = {
  dayIndex: number;
  setIsMoreEventsModalOpened: Dispatch<SetStateAction<boolean[]>>;
  dayId: string;
};

export function ShowMoreEventsButton({
  dayIndex,
  setIsMoreEventsModalOpened,
  dayId,
}: props): ReactElement {
  const [idsOfDaysWithEventsRemoved] = useAtom(idsOfDaysWithEventsRemovedAtom);
  const numOfHiddenEvents = CountOccurrencesInArray(
    idsOfDaysWithEventsRemoved,
    dayId,
  );
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
