type eventColor = "blue" | "red" | "green";
type event = {
  id: string;
  eventColor: eventColor;
  eventName: string;
  eventDate?: string;
};
type allDayEvent = event;

type notAllDayEvent = event & {
  startTime: string;
  endTime: string;
};
