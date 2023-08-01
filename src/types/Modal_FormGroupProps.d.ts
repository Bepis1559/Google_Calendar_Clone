import type {
  HTMLInputTypeAttribute,
  Dispatch,
  InsHTMLAttributes,
} from "react";
import { type reducerAction } from "../components/Modal/AddEventModal";

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
};

type FormGroup_CheckBoxProps = baseForm & {
  checked: boolean;
};
