type eventColor = "blue" | "red" | "green";
type allDayEvent = {
  eventColor: eventColor;
  eventName: string;
};

type notAllDayEvent = allDayEvent & {
  startTime: string;
};
