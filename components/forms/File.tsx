"use client";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "@/types/types";
import clsx from "clsx";
const File = ({ name, label, className }: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <input
        {...register(name)}
        type="file"
        className={clsx(
          "border border-text-secondary p-2 rounded-md outline-none bg-primary-dark w-full",
          errors[name] && "border-red-500 " , className
        )}
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
export default File;
