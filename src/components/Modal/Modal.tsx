import { forwardRef, Ref, type ReactElement } from "react";
import { Form } from "./Form";
import { handleCloseBtn } from "../../helpers/Modal/handleCloseButton";
import { ModalProps } from "../../types/Modals";

function Inner(props: ModalProps, ref: Ref<HTMLDivElement>): ReactElement {
  const {
    title,
    date,
    handleEventModal,
    onFormSubmit,
    dispatch,
    state,
    modalRef,
  } = props;
  return (
    <>
      <div ref={ref} className="modal opening">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>{title}</div>
            <small>{date}</small>
            <button
              onClick={() => handleCloseBtn(handleEventModal, modalRef)}
              type="button"
              className="close-btn">
              &times;
            </button>
          </div>
          <Form onFormSubmit={onFormSubmit} dispatch={dispatch} state={state} />
        </div>
      </div>
    </>
  );
}

export const Modal = forwardRef(Inner);
