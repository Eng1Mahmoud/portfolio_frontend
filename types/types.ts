import { ReactNode } from "react";
import { DefaultValues, FieldValues } from "react-hook-form";
import { ZodSchema } from "zod";
// Interface for toast options  
export interface ToastOptions {
  type: "success" | "error" | "warning" | "info";
  message: string;
}
// Interface for form state
export interface IactionState {
    message: string;
    success: boolean;
}

// Interface for form props
export interface FormProps<T extends FieldValues> {
    defaultValues?: DefaultValues<T>;
    schema: ZodSchema<T>;
    action: (
      prevState: IactionState,
      data: T
    ) => Promise<IactionState>;
    children: ReactNode;
    className?: string;
  }
  
  // input filed props
  export interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
    className?: string;
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