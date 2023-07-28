import type { ReactElement } from "react";
import { Header } from "./Header";
import { Days } from "./Days";

export function Calendar(): ReactElement {
  return (
    <div className="calendar">
      <Header />
      <Days />
    </div>
  );
}
