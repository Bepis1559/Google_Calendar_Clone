import { isBefore, isSameMonth, startOfDay } from "date-fns";

export function handleDayClasses(
  today: Date,
  visibleDate: Date,
  unMutableToday: Date,
) {
  const sameMonthClass = isSameMonth(visibleDate, today) ? "" : "non-month-day";
  const oldDayClass = isBefore(
    startOfDay(visibleDate),
    startOfDay(unMutableToday),
  )
    ? "old-month-day"
    : "";
  return `${sameMonthClass} ${oldDayClass} day`;
}
