"use client";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "@/types/forms";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  fieldBase,
  fieldError,
  fieldVariants,
  labelVariants,
} from "./fieldStyles";

const InputField = ({
  name,
  label,
  className,
  type = "text",
  variant = "dark",
  showLabel,
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [isHovered, setIsHovered] = useState(false);

  // Dashboard fields show their label; the public site keeps its cleaner look
  // and exposes the label to assistive tech only.
  const labelIsVisible = showLabel ?? variant === "light";
  const errorId = `${name}-error`;
  const hasError = Boolean(errors[name]);

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Always rendered: a placeholder is not an accessible name, and it
          disappears as soon as the user types. */}
      <label
        htmlFor={name}
        className={clsx(
          labelIsVisible
            ? clsx("text-sm font-medium", labelVariants[variant])
            : "sr-only",
        )}
      >
        {label}
      </label>

      <motion.div
        whileTap={{ scale: 0.98 }}
        animate={{
          scale: isHovered ? 1.01 : 1,
          boxShadow: isHovered ? "0 4px 12px rgba(59, 130, 246, 0.15)" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {variant === "dark" && (
          <motion.div
            className="absolute inset-0 bg-sage/[0.06] pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <input
          {...register(name)}
          id={name}
          type={type}
          placeholder={label}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={clsx(
            fieldBase,
            fieldVariants[variant],
            hasError && fieldError,
            className,
          )}
        />
      </motion.div>

      {hasError && (
        <motion.p
          id={errorId}
          role="alert"
          className="text-red-500 text-sm pl-2 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <span
            aria-hidden="true"
            className="inline-block w-1 h-1 bg-red-500 rounded-full"
          />
          {errors[name]?.message as string}
        </motion.p>
      )}
    </motion.div>
  );
};

export default InputField;
