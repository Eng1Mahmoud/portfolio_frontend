import React from "react";
import { useFormContext } from "react-hook-form";
import { TextAreaProps } from "@/types/types";
import clsx from "clsx";
const TextArea = ({ name, label,rows=4, className="" }: TextAreaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2 ">
      <textarea
        placeholder={label}
        className={clsx(
          "w-full bg-primary-dark rounded-md outline-none p-2 border border-text-secondary",
          errors[name] && "border-red-500" , className
        )}
        id={name}
        rows={rows}
        {...register(name)}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextArea;
