import type {
  HTMLInputTypeAttribute,
  Dispatch,
  InsHTMLAttributes,
} from "react";
import { type reducerAction } from "../components/Modal/AddEventModal";

type reducerAction = {
  type: "setIsAllDayChecked" | "setName" | "setStartTime" | "setEndTime";
  payload?: {
    value: string | boolean;
  };
};
type formState = {
  isAllDayChecked: boolean;
  eventName: string;
  startTime: string;
  endTime: string;
};

type baseForm = InsHTMLAttributes<HTMLInputElement> & {
  name: string;
  labelContent: string;
  type: HTMLInputTypeAttribute;
  dispatchType:
    | "setIsAllDayChecked"
    | "setName"
    | "setStartTime"
    | "setEndTime";
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
