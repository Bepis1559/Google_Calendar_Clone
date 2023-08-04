import { formState } from "./Modal_FormGroupProps";

type ModalProps = {
  modalRef: RefObject<HTMLDivElement>;
  title: string;
  date: string;
  handleEventModal: () => void;
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  dispatch: Dispatch<reducerAction>;
  state: formState;
};

type EditEventModalProps = event & {
  isAllDayChecked?: boolean;
  startTime?: boolean;
  endTime?: boolean;
};
type AddEventModalProps = {
  date: string;
  handleEventModal: () => void;
};
