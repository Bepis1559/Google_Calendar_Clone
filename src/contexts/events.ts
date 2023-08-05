import { atom } from "jotai";
// import { type formState } from "../types/Modal_FormGroupProps";

export const notAllDayEventsArrayAtom = atom<event[]>([]);
export const allDayEventsArrayAtom = atom<event[]>([]);

// export const currentEventStateAtom = atom<formState>({
//   isAllDayChecked: false,
//   eventName: "",
//   startTime: "",
//   endTime: "",
//   eventColor: "blue",
// });
