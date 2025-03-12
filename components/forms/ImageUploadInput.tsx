"use client";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "@/types/forms";
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";
import { useState } from "react";
const ImageUploadInput = ({ name, label, className }: InputFieldProps) => {
  const { loading, uploadImage } = useImageUpload();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [url, setUrl] = useState<string | undefined>(getValues(name));
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = await uploadImage(file);
      setValue(name, fileUrl);
      setUrl(fileUrl);
    }
  };

  const handleDelete = () => {
    setValue(name, "");
    setUrl("");
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-700">{label}</label>
      <div
        className={`border border-dashed border-gray-400 rounded-md p-4 h-[200px] flex items-center justify-center ${className}`}
      >
        {url && url !== "" ? (
          <div className="relative w-full h-full">
            <Image
              src={url}
              alt="Uploaded Image"
              fill
              className="rounded-md object-contain"
            />
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md"
            >
              Delete
            </button>
          </div>
        ) : (
          <input
            {...register(name)}
            type="file"
            accept="image/*"
            className="hidden"
            id={name}
            onChange={handleFileChange}
          />
        )}
        {!url && (
          <label htmlFor={name} className="cursor-pointer text-center">
            <span className="text-gray-500">
              {loading ? "Uploading..." : "Click or Drag to upload an image"}
            </span>
          </label>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default ImageUploadInput;
