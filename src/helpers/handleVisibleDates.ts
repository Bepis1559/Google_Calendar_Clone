import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export function handleVisibleDates(visibleDate: Date) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleDate)),
    end: endOfWeek(endOfMonth(visibleDate)),
  });
  return visibleDates;
}
