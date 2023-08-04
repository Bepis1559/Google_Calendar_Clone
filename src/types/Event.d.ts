type eventColor = "blue" | "red" | "green";
type event = {
  eventColor: eventColor;
  eventName: string;
  eventDate?: string;
};
type allDayEvent = event;

type notAllDayEvent = event & {
  startTime: string;
};
