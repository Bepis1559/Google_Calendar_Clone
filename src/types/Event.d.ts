type eventColor = "blue" | "red" | "green";
type allDayEvent = {
  eventColor: eventColor;
  eventName: string;
  eventDate?: string;
  index: number;
  setIsEventModalOpened: Dispatch<SetStateAction<boolean[]>>;
};

type notAllDayEvent = allDayEvent & {
  startTime: string;
};
