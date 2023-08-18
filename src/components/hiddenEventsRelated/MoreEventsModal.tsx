import { type ReactElement, useRef, forwardRef, ForwardedRef } from "react";
import { Event } from "../Events/Event";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";

type boolString = "true" | "false";

type props = {
  removedEventsOfThatDay: removedEventType[];
  handleEventModal: () => void;
  currentDate: string;
};

function Inner(props: props, ref: ForwardedRef<HTMLDivElement>): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);
  const { removedEventsOfThatDay, handleEventModal, currentDate } = props;
  const getBooleanFromAttribute = (isAllDayChecked: boolString) =>
    isAllDayChecked == "true";

  return (
    <>
      <div ref={modalRef} className="modal opening">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            {currentDate}
            <button
              onClick={() => handleCloseBtn(handleEventModal, modalRef)}
              type="button"
              className="close-btn">
              &times;
            </button>
          </div>
          <div className="events">
            {removedEventsOfThatDay.map(({ event }) => {
              const { id } = event;
              const eventColor = event.getAttribute("data-event_color");
              const isAllDayChecked_attribute = event.getAttribute(
                "data-is_all_day_checked",
              ) as boolString;
              const isAllDayChecked = getBooleanFromAttribute(
                isAllDayChecked_attribute,
              );
              const eventName = event.getAttribute("data-event_name");
              const eventDate = event.getAttribute("data-event_date");
              const startTime = event.getAttribute("data-start_time");
              const endTime = event.getAttribute("data-end_time");
              return (
                <Event
                  ref={ref}
                  key={id}
                  id={id}
                  eventColor={eventColor as eventColor}
                  isAllDayChecked={isAllDayChecked}
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

export const MoreEventsModal = forwardRef(Inner);
