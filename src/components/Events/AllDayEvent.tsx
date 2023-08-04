import { type ReactElement } from "react";
import { allDayEventsArrayAtom } from "../../contexts/events";
import { useAtom } from "jotai";

export function AllDayEvent(props: allDayEvent): ReactElement {
  const { eventColor, eventName, eventDate } = props;
  const [allDayEventsArray] = useAtom(allDayEventsArrayAtom);
  // const [isModalOpened, setIsModalOpened] = useState(false);
  // const modalRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    let selectedEvent: allDayEvent | undefined = undefined;
    allDayEventsArray.forEach((allDayEvent) => {
      if (
        eventColor == allDayEvent.eventColor &&
        eventName == allDayEvent.eventName &&
        eventDate == allDayEvent.eventDate
      ) {
        selectedEvent = allDayEvent;
      }
    });

    console.log(selectedEvent);
    // if (selectedEvent) {
    //   setIsModalOpened(true);
    // } else {
    //   setIsModalOpened(false);
    // }
  }

  return (
    <>
      {/* {isModalOpened ? <EditEventModal /> : null} */}
      <button
        onClick={handleClick}
        type="button"
        className={`all-day-event ${eventColor} event`}>
        <div className="event-name">{eventName}</div>
      </button>
    </>
  );
}
