"use client";
import { useFormContext } from "react-hook-form";
import { SubmitButtonProps } from "@/types/types";
const SubmitButton = ({ name }: SubmitButtonProps) => {
  const {
    formState: { isSubmitSuccessful },
  } = useFormContext();
  return (
    <button
      disabled={isSubmitSuccessful}
      type="submit"
      className="w-full bg-secondary-light text-white p-2 rounded-md hover:bg-secondary-dark transition-colors duration-300"
    >
      {isSubmitSuccessful ? "Loading..." : name}
    </button>
  );
};

export default SubmitButton;
