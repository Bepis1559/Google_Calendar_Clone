import type {
  HTMLInputTypeAttribute,
  Dispatch,
  InsHTMLAttributes,
} from "react";
import { type reducerAction } from "../components/Modal/AddEventModal";

type reducerActionType =
  | "setIsAllDayChecked"
  | "setName"
  | "setStartTime"
  | "setEndTime"
  | "setEventColor";

type reducerAction = {
  type: reducerActionType;
  payload?: {
    value: string | boolean;
  };
};
type formState = {
  isAllDayChecked: boolean;
  eventName: string;
  startTime: string;
  endTime: string;
  eventColor: eventColor;
};

type baseForm = InsHTMLAttributes<HTMLInputElement> & {
  name: string;
  labelContent: string;
  type: HTMLInputTypeAttribute;
  dispatchType: reducerActionType;
  dispatch: Dispatch<reducerAction>;
};

type FormGroupProps = baseForm & {
  disabled?: boolean;
  value?: string;
  min?: string;
  max?: string;
};

type FormGroup_CheckBoxProps = baseForm & {
  checked: boolean;
};
