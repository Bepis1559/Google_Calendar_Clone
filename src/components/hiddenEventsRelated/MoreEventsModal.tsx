import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { isMoreEventsModalOpenedAtom } from "../../contexts/events";
import { Event } from "../Events/Event";

type props = {
  removedEventsOfThatDay: removedEventType[];
};

export function MoreEventsModal({
  removedEventsOfThatDay,
}: props): ReactElement {
  const [, setIsMoreEventsModalOpened] = useAtom(isMoreEventsModalOpenedAtom);

  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            6/8/23 (Change that with dynamic one)
            <button
              onClick={() => setIsMoreEventsModalOpened(false)}
              type="button"
              className="close-btn">
              &times;
            </button>
          </div>
          <div className="events">
            {removedEventsOfThatDay.map(
              ({
                event: {
                  id,
                  "data-is_all_day_checked": isAllDayChecked,
                  "data-event_color": eventColor,
                  "data-event_name": eventName,
                  "data-event_date": eventDate,
                  "data-start_time": startTime,
                  "data-end_time": endTime,
                },
              }) => (
                <Event
                  key={id}
                  id={id}
                  eventColor={eventColor as eventColor}
                  isAllDayChecked={Boolean(isAllDayChecked)}
                  eventName={eventName}
                  eventDate={eventDate}
                  startTime={startTime}
                  endTime={endTime}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
