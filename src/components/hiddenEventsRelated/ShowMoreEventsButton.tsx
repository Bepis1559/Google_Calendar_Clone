import { useAtom } from "jotai";
import { type ReactElement } from "react";
import {
  isMoreEventsModalOpenedAtom,
  removedEventsAtom,
} from "../../contexts/events";
import { MoreEventsModal } from "./MoreEventsModal";

type props = {
  numOfHiddenEvents: number;
  dayId: string;
};

export function ShowMoreEventsButton({
  numOfHiddenEvents,
  dayId,
}: props): ReactElement {
  const [isMoreEventsModalOpened, setIsMoreEventsModalOpened] = useAtom(
    isMoreEventsModalOpenedAtom,
  );
  const [removedEvents] = useAtom(removedEventsAtom);

  const removedEventsOfThatDay = removedEvents.filter(
    ({ parent: { id } }) => id == dayId,
  );

  function handleClick() {
    setIsMoreEventsModalOpened(true);
  }
  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="events-view-more-btn">
        +{numOfHiddenEvents} More
      </button>
      {isMoreEventsModalOpened ? (
        <MoreEventsModal removedEventsOfThatDay={removedEventsOfThatDay} />
      ) : null}
    </>
  );
}
