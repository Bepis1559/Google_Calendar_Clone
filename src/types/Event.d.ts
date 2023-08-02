type EventProps = {
  eventColor: "blue" | "red" | "green";
  eventName: string;
};

type NotAllDayEventProps = EventProps & {
  startTime: string;
};
