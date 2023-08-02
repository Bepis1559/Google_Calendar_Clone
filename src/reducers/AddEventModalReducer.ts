import type { formState, reducerAction } from "../types/Modal_FormGroupProps";

export function AddEventModalReducer(
  state: formState,
  { type, payload }: reducerAction,
) {
  const { value } = payload ?? {};
  switch (type) {
    case "setIsAllDayChecked":
      return { ...state, isAllDayChecked: value as boolean };
    case "setName":
      return { ...state, eventName: value as string };
    case "setStartTime":
      return { ...state, startTime: value as string };
    case "setEndTime":
      return { ...state, endTime: value as string };
    case "setEventColor":
      return { ...state, eventColor: value as eventColor };
    default:
      throw new Error(
        "Something went wrong with the reducer in the modal form",
      );
  }
}
