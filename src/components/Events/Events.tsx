import { useAtom } from "jotai";
import {
  forwardRef,
  type ReactElement,
  type ForwardedRef,
  // useEffect,
  //type RefObject,
} from "react";
import { eventsAtom } from "../../contexts/events";
import { format } from "date-fns";
import { Event } from "./Event";
import { useSortButtons } from "../../hooks/useSortButtons";

function Inner(
  { visibleDate }: eventArrayProps,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const [events] = useAtom(eventsAtom);
  const dateToCompareAgainst = format(visibleDate, "M/d/yy");
  const eventsToRender = events.filter(
    ({ eventDate }) => eventDate == dateToCompareAgainst,
  );
  // useEffect(() => {
  //   if (eventsToRender.length) {
  //     console.log(eventsToRender);
  //   }

  //   const refAsObject = ref as unknown as RefObject<HTMLDivElement>;

  //   if (refAsObject.current && refAsObject.current.children.length > 1) {
  //     console.log(refAsObject.current.children);
  //   }
  // }, []);
  useSortButtons(ref);
  return (
    <>
      {eventsToRender.map((event) => (
        <Event {...event} key={event.id} />
      ))}
    </>
  );
}

export const Events = forwardRef(Inner);
