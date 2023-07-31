import { type HTMLInputTypeAttribute,type Dispatch,type SetStateAction , type InsHTMLAttributes} from "react";

type FormGroupProps = InsHTMLAttributes<HTMLInputElement> & {
  name: string;
  labelContent: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  handleOnChange: Dispatch<SetStateAction<boolean>>;
};


type FormGroup_CheckBoxProps = FormGroupProps & {
  checked: boolean;
};
