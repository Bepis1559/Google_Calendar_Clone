type eventColor = "blue" | "red" | "green";
type event = {
  id: string;
  eventColor: eventColor;
  isAllDayChecked: boolean;
  eventName: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
};

type EventButtonProps = {
  handleClick: () => void;
  eventId: string;
  eventColor: eventColor;
  eventName: string;
};
