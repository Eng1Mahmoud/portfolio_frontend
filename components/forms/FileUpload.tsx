"use client";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "@/types/forms";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";
import clsx from "clsx";
import Link from "next/link";
interface FileUploadProps extends InputFieldProps {
  type?: "file" | "image";
}
const FileUpload = ({
  name,
  label,
  className,
  type = "file",
}: FileUploadProps) => {
  const { loading, uploadImage } = useImageUpload();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const fileUrl = getValues(name);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = await uploadImage(file);
      setValue(name, fileUrl);
    }
  };

  const handleDelete = () => {
    setValue(name, "");
  };

  // FILE UPLOAD UI
  if (type === "file") {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-gray-700">{label}</label>
        <div className="relative">
          {loading ? (
            <div className="border border-text-secondary p-2 rounded-md bg-white w-full text-gray-500">
              Uploading...
            </div>
          ) : fileUrl ? (
            <div className="border border-text-secondary p-2 rounded-md w-full flex justify-between items-center">
              <span className=" truncate">
                File Uploaded you can see from{" "}
                <Link
                  href={fileUrl}
                  target="_blank"
                  className="inline-block bg-green-600 px-2 py-1 rounded-md "
                >
                  Here
                </Link>
              </span>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-2 py-1 rounded-md text-sm ml-2"
              >
                Delete
              </button>
            </div>
          ) : (
            <input
              {...register(name)}
              type="file"
              className={clsx(
                "border border-text-secondary p-2 rounded-md outline-none  w-full",
                errors[name] && "border-red-500",
                className
              )}
              onChange={handleFileChange}
            />
          )}
        </div>
        {errors[name] && (
          <p className="text-red-500 text-sm">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    );
  }
  // image upload UI
  if (type === "image") {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-gray-700">{label}</label>
        <div
          className={`border border-dashed border-gray-400 rounded-md p-4 h-[200px] flex items-center justify-center ${className}`}
        >
          {fileUrl && fileUrl !== "" ? (
            <div className="relative w-full h-full">
              <Image
                src={fileUrl}
                alt="Uploaded Image"
                fill
                className="rounded-md object-cover"
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
          {!fileUrl && (
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
  }
};

export default FileUpload;
