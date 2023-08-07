import { atom } from "jotai";

let eventsFromLocalStorage: event[] = [];
if (localStorage.getItem("events") !== null) {
  eventsFromLocalStorage = JSON.parse(localStorage.getItem("events") as string);
}
export const eventsAtom = atom<event[]>(eventsFromLocalStorage);
