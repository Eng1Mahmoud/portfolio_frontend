"use client";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "@/types/forms";
import clsx from "clsx";
const InputField = ({ name, label, className, type= "text",value }: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <input
        {...register(name)}
        type={type}
        className={clsx(
          "border border-text-secondary p-2 rounded-md outline-none bg-primary-dark w-full",
          errors[name] && "border-red-500 " , className
        )}
        placeholder={label}
        value={value}
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
