import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { todaysAtom } from "../contexts/calendar";
import { addMonths, format, subMonths } from "date-fns";

export function Header(): ReactElement {
  const [today, setToday] = useAtom(todaysAtom);
  const formattedDate = format(today, "MMMM yyyy");
  const handleToday = () => setToday(new Date());
  const handleNextMonth = () => setToday((prev) => addMonths(prev, 1));
  const handlePrevMonth = () => setToday((prev) => subMonths(prev, 1));

  return (
    <div className="header">
      <button onClick={handleToday} type="button" className="btn">
        Today
      </button>
      <div>
        <button
          onClick={handlePrevMonth}
          type="button"
          className="month-change-btn">
          &lt;
        </button>
        <button
          onClick={handleNextMonth}
          type="button"
          className="month-change-btn">
          &gt;
        </button>
      </div>
      <span className="month-title">{formattedDate}</span>
    </div>
  );
}
