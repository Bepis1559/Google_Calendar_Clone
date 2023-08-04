type EditEventModalProps = {
  event: allDayEvent;
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
  // | notAllDayEvent;
};
type AddEventModalProps = {
  date: string;
  handleEventModal: () => void;
};
