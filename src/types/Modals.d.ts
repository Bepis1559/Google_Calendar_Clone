type EditEventModalProps = {
  event: event;
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
  // | notAllDayEvent;
};
type AddEventModalProps = {
  date: string;
  handleEventModal: () => void;
};
