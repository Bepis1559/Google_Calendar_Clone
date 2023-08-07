import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { eventsAtom } from "../../../contexts/events";
import { useEventsLocalStorage } from "../../../hooks/useEventsLocalStorage";

type props = {
  eventId: string;
};

export function DeleteButton({ eventId }: props): ReactElement {
  const [, setEventsArray] = useAtom(eventsAtom);

  function handleClick() {
    setEventsArray((prev) => prev.filter(({ id }) => id != eventId));
  }
  useEventsLocalStorage();

  return (
    <>
      <button onClick={handleClick} className="btn btn-delete" type="button">
        Delete
      </button>
    </>
  );
}
