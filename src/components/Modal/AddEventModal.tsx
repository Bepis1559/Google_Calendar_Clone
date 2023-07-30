import { useRef, type ReactElement } from "react";
import { FormGroup } from "./FormGroup";
import { FormGroup_CheckBox } from "./FormGroup_CheckBox";
import { Button } from "../Button";
import { RowInput } from "./RowInput";

type props = {
  handleCloseEventModal: () => void;
};

export function AddEventModal({ handleCloseEventModal }: props): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);
  const root = useRef(document.documentElement);
  const animationDuration = getComputedStyle(root.current)
    .getPropertyValue("--modalAnimationDuration")
    .trim();
  function handleCloseBtn() {
    if (modalRef) {
      modalRef.current?.classList.remove("opening");
      modalRef.current?.classList.add("closing");
    }

    setTimeout(() => {
      handleCloseEventModal();
    }, parseInt(animationDuration));
  }

  return (
    <>
      <div ref={modalRef} className="modal opening">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>Add Event</div>
            <small>6/8/23</small>
            <Button
              handleClick={handleCloseBtn}
              classes="close-btn"
              content="&times;"
            />
          </div>
          <form>
            <FormGroup inputName="name" labelContent="Name" inputType="text" />
            <FormGroup_CheckBox inputName="all-day" labelContent="All Day?" />
            <div className="row">
              <FormGroup inputName="start-time" labelContent="Start Time" />
              <FormGroup inputName="end-time" labelContent="End Time" />
            </div>
            <div className="form-group">
              <label>Color</label>
              <div className="row left">
                <RowInput inputId="blue" defaultChecked={true} />
                <RowInput inputId="red" />
                <RowInput inputId="green" />
              </div>
            </div>
            <div className="row">
              <button className="btn btn-success" type="submit">
                Add
              </button>
              <button className="btn btn-delete" type="button">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
