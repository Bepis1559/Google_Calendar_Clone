import { type HTMLInputTypeAttribute,type Dispatch,type SetStateAction , type InsHTMLAttributes} from "react";

type baseForm = InsHTMLAttributes<HTMLInputElement> & {
  name: string;
  labelContent: string;
  type: HTMLInputTypeAttribute;
 
}


type FormGroupProps = baseForm & {

  disabled?: boolean;
  value? : string 
  handleOnChange: Dispatch<SetStateAction<string>> ;
};


type FormGroup_CheckBoxProps = baseForm & {
  handleOnChange: Dispatch<SetStateAction<boolean>> ;
  checked: boolean;
};
