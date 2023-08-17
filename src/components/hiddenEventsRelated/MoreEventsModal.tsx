import type { Dispatch, SetStateAction, ReactElement } from "react";
import { Event } from "../Events/Event";
import { handleEventModal } from "../../helpers/handleEventModal";

type props = {
  removedEventsOfThatDay: removedEventType[];
  setIsMoreEventsModalOpened: Dispatch<SetStateAction<boolean[]>>;
  dayIndex: number;
};

export function MoreEventsModal({
  removedEventsOfThatDay,
  setIsMoreEventsModalOpened,
  dayIndex,
}: props): ReactElement {
  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            6/8/23 (Change that with dynamic one)
            <button
              onClick={() =>
                handleEventModal(dayIndex, "close", setIsMoreEventsModalOpened)
              }
              type="button"
              className="close-btn">
              &times;
            </button>
          </div>
          <div className="events">
            {removedEventsOfThatDay.map(({ event }) => {
              const { id } = event;
              const eventColor = event.getAttribute("data-event_color");
              const isAllDayChecked = event.getAttribute(
                "data-is_all_day_checked",
              );
              const eventName = event.getAttribute("data-event_name");
              const eventDate = event.getAttribute("data-event_date");
              const startTime = event.getAttribute("data-start_time");
              const endTime = event.getAttribute("data-end_time");
              return (
                <Event
                  key={id}
                  id={id}
                  eventColor={eventColor as eventColor}
                  isAllDayChecked={Boolean(isAllDayChecked)}
                  eventName={eventName ?? ""}
                  eventDate={eventDate ?? ""}
                  startTime={startTime ?? ""}
                  endTime={endTime ?? ""}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
