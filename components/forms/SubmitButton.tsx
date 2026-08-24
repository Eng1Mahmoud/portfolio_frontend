"use client";
import { SubmitButtonProps } from "@/types/forms";
import clsx from "clsx";

const VARIANTS = {
  admin:
    "bg-sage text-surface-base hover:bg-sage-bright shadow-surface-well/60",
  site: "bg-sage text-surface-base hover:bg-sage-bright shadow-surface-well/60",
} as const;

const SubmitButton = ({
  name,
  className,
  variant = "admin",
  isPending,
}: SubmitButtonProps) => {
  return (
    <button
      disabled={isPending}
      type="submit"
      className={clsx(
        "flex w-full items-center justify-center rounded-md p-2 font-medium shadow-md transition-colors duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base",
        VARIANTS[variant],
        isPending && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {isPending && (
        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span>{name}</span>
    </button>
  );
};

export default SubmitButton;
