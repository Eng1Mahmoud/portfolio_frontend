import React from "react";
import { useFormContext } from "react-hook-form";
import { TextAreaProps } from "@/types/types";
const TextArea = ({ name, label,rows=4 }: TextAreaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2 ">
      <textarea
        placeholder={label}
        className="w-full bg-primary-dark rounded-md outline-none p-2 border border-text-secondary"
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
