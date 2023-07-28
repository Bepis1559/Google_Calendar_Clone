import { atom } from "jotai";

const today = new Date();

export const todaysAtom = atom(today);
