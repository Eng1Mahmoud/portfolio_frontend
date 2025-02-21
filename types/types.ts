import { ReactNode } from "react";
import { DefaultValues, FieldValues } from "react-hook-form";
import { ZodSchema } from "zod";

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
  