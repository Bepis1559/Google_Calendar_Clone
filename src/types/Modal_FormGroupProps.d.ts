import { type HTMLInputTypeAttribute,type Dispatch,type SetStateAction } from "react";

type FormGroupProps = {
  name: string;
  labelContent: string;
  inputType?: HTMLInputTypeAttribute;
  handleOnChange  : Dispatch<SetStateAction<boolean>>;
  
};


type FormGroup_CheckBoxProps = FormGroupProps & {
  checked: boolean;
};
