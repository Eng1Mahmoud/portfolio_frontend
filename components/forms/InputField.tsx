"use client";
import { useFormContext } from "react-hook-form";
interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
}
const InputField = ({ name, label, type = "text" }: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name)}
        type={type}
        className="border p-2 rounded-md"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputField;
