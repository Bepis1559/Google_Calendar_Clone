import { type ReactElement, useRef, forwardRef, ForwardedRef } from "react";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import { Events } from "../Events/Events";

type props = {
  handleEventModal: () => void;
  currentDate: string;
  visibleDate: Date;
};

function Inner(props: props, ref: ForwardedRef<HTMLDivElement>): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);
  const { handleEventModal, currentDate, visibleDate } = props;

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

          <Events
            visibleDate={visibleDate}
            ref={ref}
            isForRemovedEvents={true}
          />
        </div>
      </div>
    </>
  );
}

export const MoreEventsModal = forwardRef(Inner);
