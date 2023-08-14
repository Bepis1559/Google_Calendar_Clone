import { atom } from "jotai";

let eventsFromLocalStorage: event[] = [];
if (localStorage.getItem("events") !== null) {
  eventsFromLocalStorage = JSON.parse(localStorage.getItem("events") as string);
}
export const eventsAtom = atom<event[]>(eventsFromLocalStorage);

const removedEvents: removedEventType[] = [];
export const removedEventsAtom = atom(removedEvents);

export const idsOfDaysWithEventsRemovedAtom = atom<string[]>(
  removedEvents.map(({ parent: { id } }) => id),
);
