import type { ReactElement } from "react";

export function Header(): ReactElement {
  return (
    <div className="header">
      <button type="button" className="btn">
        Today
      </button>
      <div>
        <button type="button" className="month-change-btn">
          &lt;
        </button>
        <button type="button" className="month-change-btn">
          &gt;
        </button>
      </div>
      <span className="month-title">June 2023</span>
    </div>
  );
}
