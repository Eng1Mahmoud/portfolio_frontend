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
      if (fileUrl) {
        setValue(name, fileUrl, { shouldValidate: true });
        setUrl(fileUrl);
      }
    }
  };

  const handleDelete = () => {
    setValue(name, "", { shouldValidate: true });
    setUrl("");
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`file-picker-${name}`}
        className="text-sm font-medium text-ink-body"
      >
        {label}
      </label>
      {/* Hidden input registered with RHF to hold the URL value */}
      <input type="hidden" {...register(name)} />
      <div
        className={`flex h-[200px] items-center justify-center rounded-lg border border-dashed border-parchment/20 bg-surface-well/40 p-4 transition-colors hover:border-sage/40 ${className}`}
      >
        {url && url !== "" ? (
          <div className="relative w-full h-full">
            <Image
              src={url}
              alt="Uploaded Image"
              fill
              unoptimized
              className="rounded-md object-contain"
            />
            <button
              type="button"
              onClick={handleDelete}
              className="absolute right-2 top-2 rounded-md border border-red-500/30 bg-red-500/15 px-2 py-1 text-xs font-medium text-red-200 backdrop-blur-sm transition-colors hover:bg-red-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Delete
            </button>
          </div>
        ) : (
          <>
            {/* Separate unregistered file input — only used to pick files */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={`file-picker-${name}`}
              onChange={handleFileChange}
            />
            <label
              htmlFor={`file-picker-${name}`}
              className="cursor-pointer text-center"
            >
              <span className="text-sm text-ink-muted">
                {loading ? "Uploading…" : "Click or drag to upload an image"}
              </span>
            </label>
          </>
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
