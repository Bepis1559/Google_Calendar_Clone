import { useEffect, useRef } from "react";
import { createMonthObject } from "../helpers/DaysIds";

export function useDaysIds(today: Date, visibleDates: Date[]) {
  const months = useRef<MonthObject[]>([]);
  const todaysMonth = today.getMonth();
  const todaysYear = today.getFullYear();

  useEffect(() => {
    const currentMonth = months.current.find(
      ({ month, year }) => month === todaysMonth && year === todaysYear,
    );
    if (!currentMonth) {
      const newMonth: MonthObject = createMonthObject(today, visibleDates);
      months.current.push(newMonth);
    }
    console.log(months.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todaysMonth, todaysYear]);

  return months.current.find(
    ({ month, year }) => month === todaysMonth && year === todaysYear,
  );
}
