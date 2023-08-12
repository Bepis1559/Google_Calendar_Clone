import { useAtom } from "jotai";
import {
  type MutableRefObject,
  type RefObject,
  useEffect,
  useMemo,
} from "react";
import { eventsAtom } from "../contexts/events";
import { hadleObserving, handleRemove } from "../helpers/ResizeDays";

export type removedEventType = {
  target: HTMLButtonElement;
  parent?: HTMLElement;
  parentId: string;
};

export function useResizeDays(
  dayRefs: MutableRefObject<RefObject<HTMLDivElement>[]>,
) {
  const [events] = useAtom(eventsAtom);
  const removedEvents: removedEventType[] = useMemo(() => [], []);
  useEffect(() => {
    if (dayRefs.current) {
      const divElements_days = dayRefs.current.map(
        (day) => day.current,
      ) as HTMLDivElement[];

      const daysDivsObserver = new ResizeObserver((entries) => {
        entries.forEach(({ target }) => {
          handleRemove(target as HTMLDivElement);
        });
      });

      hadleObserving(divElements_days, daysDivsObserver);

      return () => {
        daysDivsObserver.disconnect();
      };
    }
  }, [events, dayRefs, removedEvents]);
}
