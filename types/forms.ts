import { ReactNode } from "react";
import { DefaultValues, FieldValues } from "react-hook-form";
import { ZodSchema } from "zod";
import { IactionState } from "./general";

export interface FormProps<T extends FieldValues> {
    defaultValues?: DefaultValues<T>;
    schema: ZodSchema<T>;
    action: (prevState: IactionState, data: T) => Promise<IactionState>;
    children: ReactNode;
    className?: string;
    onSuccess?: () => void;
    onError?: () => void;
    redirectPath?: string;
  }
  
  // input filed props
  export interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    className?: string;
    value?: string;
  }
  // text area props
  export interface TextAreaProps {
    name: string;
    label: string;
    rows?: number;
    className?: string;
  }
  
  // submit button props
  export interface SubmitButtonProps {
    name: string;
    className?: string;
  }
  