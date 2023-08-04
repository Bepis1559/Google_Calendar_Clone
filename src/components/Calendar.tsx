import type { ReactElement } from "react";
import { Header } from "./header/Header";
import { Days } from "./days/Days";

export function Calendar(): ReactElement {
  return (
    <div className="calendar">
      <Header />
      <Days />
    </div>
  );
}
