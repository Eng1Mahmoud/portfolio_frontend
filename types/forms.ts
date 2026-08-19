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
  buttonProps: {
    name: string;
    className?: string;
  };
}

/**
 * "dark"  — the public site's glass-on-navy fields (default)
 * "light" — the dashboard's white cards
 *
 * Replaces the `.input-light` / `.input-dark` `!important` overrides that
 * previously fought the component's own hardcoded styling.
 */
export type FieldVariant = "dark" | "light";

// input filed props
export interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  className?: string;
  variant?: FieldVariant;
  /** Render the label visually but keep it for screen readers when false. */
  showLabel?: boolean;
}
// text area props
export interface TextAreaProps {
  name: string;
  label: string;
  rows?: number;
  className?: string;
  variant?: FieldVariant;
  showLabel?: boolean;
}

// submit button props
export interface SubmitButtonProps {
  name: string;
  className?: string;
  isPending: boolean;
}
