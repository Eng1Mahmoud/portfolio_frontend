"use client";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "@/types/types";
import { useState } from "react";
import Image from "next/image";

const ImageUpload = ({ name, label, className }: InputFieldProps) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [uploading, setUploading] = useState(false);

  // Get the image URL from the form values
  const imageUrl = getValues(name);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:10000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      setValue(name, data.url); // Set the image URL in the form
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = () => {
    setValue(name, null); // Clear the image URL from the form
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-700">{label}</label>
      <div
        className={`border border-dashed border-gray-400 rounded-md p-4 h-[200px] flex items-center justify-center ${className}`}
      >
        {imageUrl && imageUrl !== "" ? (
  <div className="relative w-full h-full">
    <Image
      src={imageUrl}
      alt="Uploaded Image"
      fill
      className="rounded-md object-cover"
    />
    <button
      onClick={handleDeleteImage}
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
        {!imageUrl && (
          <label htmlFor={name} className="cursor-pointer text-center">
            <span className="text-gray-500">
              {uploading ? "Uploading..." : "Click or Drag to upload an image"}
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

export default ImageUpload;
