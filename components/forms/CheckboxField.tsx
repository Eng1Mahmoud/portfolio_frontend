"use client";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { FieldVariant } from "@/types/forms";
import { labelVariants } from "./fieldStyles";

interface CheckboxFieldProps {
  name: string;
  label: string;
  /** Sits under the label — what turning this on actually does. */
  hint?: string;
  variant?: FieldVariant;
}

/**
 * A boolean toggle. The shared field styles assume a full-width box, so this
 * lays the control out beside its label instead of reusing `fieldBase`.
 */
const CheckboxField = ({
  name,
  label,
  hint,
  variant = "dark",
}: CheckboxFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorId = `${name}-error`;
  const hasError = Boolean(errors[name]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          {...register(name)}
          id={name}
          type="checkbox"
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-gray-300 text-sage accent-sage focus:outline-none focus:ring-2 focus:ring-sage/30"
        />
        <label
          htmlFor={name}
          className={clsx(
            "cursor-pointer text-sm font-medium",
            labelVariants[variant],
          )}
        >
          {label}
          {hint && (
            <span className="mt-0.5 block text-xs font-normal text-gray-500">
              {hint}
            </span>
          )}
        </label>
      </div>

      {hasError && (
        <p id={errorId} role="alert" className="pl-2 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CheckboxField;
