import { useAtom } from "jotai";
import type { Dispatch, SetStateAction, ReactElement } from "react";
import { removedEventsAtom } from "../../contexts/events";
import { MoreEventsModal } from "./MoreEventsModal";
import { handleEventModal } from "../../helpers/handleEventModal";

type props = {
  numOfHiddenEvents: number;
  dayId: string;
  dayIndex: number;
  isMoreEventsModalOpened: boolean;
  setIsMoreEventsModalOpened: Dispatch<SetStateAction<boolean[]>>;
};

export function ShowMoreEventsButton({
  numOfHiddenEvents,
  dayId,
  dayIndex,
  isMoreEventsModalOpened,
  setIsMoreEventsModalOpened,
}: props): ReactElement {
  const [removedEvents] = useAtom(removedEventsAtom);

  const removedEventsOfThatDay = removedEvents.filter(
    ({ parent: { id } }) => id == dayId,
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
      {isMoreEventsModalOpened ? (
        <MoreEventsModal
          setIsMoreEventsModalOpened={setIsMoreEventsModalOpened}
          removedEventsOfThatDay={removedEventsOfThatDay}
          dayIndex={dayIndex}
        />
      ) : null}
    </>
  );
}
