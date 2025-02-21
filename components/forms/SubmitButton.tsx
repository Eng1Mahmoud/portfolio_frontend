"use client";
import { useFormContext } from "react-hook-form";
interface SubmitButtonProps {
  name: string;
}
const SubmitButton = ({ name }: SubmitButtonProps) => {
  const {
    formState: { isSubmitSuccessful },
  } = useFormContext();
  return (
    <button
      disabled={isSubmitSuccessful}
      type="submit"
      className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
    >
      {isSubmitSuccessful ? "Loading..." : name}
    </button>
  );
};

export default SubmitButton;
