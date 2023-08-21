export function createMonthObject(
  today: Date,
  visibleDates: Date[],
): MonthObject {
  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    ids: generateIds(visibleDates),
  };
}

function generateIds(visibleDates: Date[]) {
  return visibleDates.map(() => crypto.randomUUID().toString());
}
