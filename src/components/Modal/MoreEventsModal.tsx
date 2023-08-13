import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { removedEventsAtom } from "../../contexts/events";

export function MoreEventsModal(): ReactElement {
  const [removedEvents] = useAtom(removedEventsAtom);
  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            6/8/23
            <button type="button" className="close-btn">
              &times;
            </button>
          </div>
          <div className="events">
            {removedEvents.map(({ event }) => (
              <>{event}</>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
