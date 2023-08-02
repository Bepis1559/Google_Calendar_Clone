import { format } from "date-fns";
import { Dispatch, type ReactElement } from "react";
import { handleNumberInDayClasses } from "../../helpers/Days/handleClasses";
import { handleEventModal } from "../../helpers/handleEventModal";
import { SetStateAction } from "jotai";

type props = {
  visibleDate: Date;
  index: number;
  setIsEventModalOpened: Dispatch<SetStateAction<boolean[]>>;
};

export function DayHeader(props: props): ReactElement {
  const { visibleDate, index, setIsEventModalOpened } = props;
  return (
    <div className="day-header">
      <div className="week-name">{format(visibleDate, "EEE")}</div>
      <div className={handleNumberInDayClasses(visibleDate)}>
        {visibleDate.getDate()}
      </div>
      <button
        onClick={() => handleEventModal(index, "open", setIsEventModalOpened)}
        type="button"
        className="add-event-btn">
        +
      </button>
    </div>
  );
}
