"use client";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { FieldVariant } from "@/types/forms";
import {
  fieldBase,
  fieldError,
  fieldVariants,
  labelVariants,
} from "./fieldStyles";

interface SelectFieldProps {
  name: string;
  label: string;
  options: readonly string[];
  /** Shown as the empty choice. */
  placeholder?: string;
  variant?: FieldVariant;
}

/**
 * Matches InputField: same label/error wiring, same variants, so a form does
 * not visibly change voice when it reaches a dropdown.
 */
const SelectField = ({
  name,
  label,
  options,
  placeholder = "Select…",
  variant = "dark",
}: SelectFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorId = `${name}-error`;
  const hasError = Boolean(errors[name]);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className={clsx("text-sm font-medium", labelVariants[variant])}
      >
        {label}
      </label>

      <select
        {...register(name)}
        id={name}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={clsx(
          fieldBase,
          fieldVariants[variant],
          hasError && fieldError,
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {hasError && (
        <p id={errorId} role="alert" className="pl-2 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SelectField;
