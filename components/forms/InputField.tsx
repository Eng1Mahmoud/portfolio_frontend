"use client";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "@/types/types";
const InputField = ({ name, label, type = "text" }: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <input
        {...register(name)}
        type={type}
        className="border border-text-secondary
         p-2 rounded-md outline-none bg-primary-dark w-full "
        placeholder={label}
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
