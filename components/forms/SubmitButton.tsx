"use client";
import { useFormContext } from "react-hook-form";
import { SubmitButtonProps } from "@/types/types";
import clsx from "clsx";
const SubmitButton = ({ name , className}: SubmitButtonProps) => {
  const {
    formState: { isSubmitSuccessful },
  } = useFormContext();
  return (
    <button
      disabled={isSubmitSuccessful}
      type="submit"
      className={clsx(
        "w-full bg-secondary-light text-white p-2 rounded-md hover:bg-secondary-dark transition-colors duration-300",
        isSubmitSuccessful && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {isSubmitSuccessful ? "Loading..." : name}
    </button>
  );
};

export default SubmitButton;
