import { type ReactElement, useRef, forwardRef, ForwardedRef } from "react";
import { Event } from "../Events/Event";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import { useAtom } from "jotai";
import { eventsAtom } from "../../contexts/events";
import { format } from "date-fns";

type props = {
  removedEventsOfThatDay: removedEventType[];
  handleEventModal: () => void;
  currentDate: string;
  visibleDate: Date;
};

function Inner(props: props, ref: ForwardedRef<HTMLDivElement>): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);
  const { removedEventsOfThatDay, handleEventModal, currentDate, visibleDate } =
    props;
  const [events] = useAtom(eventsAtom);
  const removedEventsOfThatDayIds = removedEventsOfThatDay.map(
    ({ event: { id } }) => id,
  );
  const dateToCompareAgainst = format(visibleDate, "M/d/yy");
  const eventsToRender = events.filter(
    ({ id, eventDate }) =>
      eventDate == dateToCompareAgainst &&
      removedEventsOfThatDayIds.includes(id),
  );

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

          {eventsToRender.map((event) => (
            <Event ref={ref} {...event} key={event.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export const MoreEventsModal = forwardRef(Inner);
