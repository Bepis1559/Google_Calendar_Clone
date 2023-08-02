type eventColor = "blue" | "red" | "green";
type EventProps = {
  eventColor: eventColor;
  eventName: string;
};

type NotAllDayEventProps = EventProps & {
  startTime: string;
};
