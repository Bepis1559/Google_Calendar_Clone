import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { eventsAtom } from "../../../contexts/events";

type props = {
  eventId: string;
};

export function DeleteButton({ eventId }: props): ReactElement {
  const [, setEvents] = useAtom(eventsAtom);

  function handleClick() {
    setEvents((prev) => prev.filter(({ id }) => id != eventId));
  }

  return (
    <>
      <button onClick={handleClick} className="btn btn-delete" type="submit">
        Delete
      </button>
    </>
  );
}
