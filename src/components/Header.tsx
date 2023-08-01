import { useAtom } from "jotai";
import { type ReactElement } from "react";
import { todaysAtom } from "../contexts/calendar";
import { addMonths, format, subMonths } from "date-fns";
import { Button } from "./Button";

export function Header(): ReactElement {
  const [today, setToday] = useAtom(todaysAtom);
  const formattedDate = format(today, "MMMM yyyy");
  const handleToday = () => setToday(new Date());
  const handleNextMonth = () => setToday((prev) => addMonths(prev, 1));
  const handlePrevMonth = () => setToday((prev) => subMonths(prev, 1));

  return (
    <div className="header">
      <Button handleClick={handleToday} classes="btn" content="Today" />
      <div>
        <Button handleClick={handlePrevMonth} content="&lt;" />
        <Button handleClick={handleNextMonth} content="&gt;" />
      </div>
      <span className="month-title">{formattedDate}</span>
    </div>
  );
}
