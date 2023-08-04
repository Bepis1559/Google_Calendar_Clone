import { atom } from "jotai";
// import { type formState } from "../types/Modal_FormGroupProps";

export const notAllDayEventsArrayAtom = atom<notAllDayEvent[]>([]);
export const allDayEventsArrayAtom = atom<allDayEvent[]>([]);

// export const currentEventStateAtom = atom<formState>({
//   isAllDayChecked: false,
//   eventName: "",
//   startTime: "",
//   endTime: "",
//   eventColor: "blue",
// });
