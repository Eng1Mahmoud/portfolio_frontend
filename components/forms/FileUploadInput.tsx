"use client";
import { useFormContext } from "react-hook-form";
import { InputFieldProps } from "@/types/forms";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useState } from "react";

const FileUploadInput = ({
  name,
  label,
  className,
  accept = "application/pdf",
}: InputFieldProps & { accept?: string }) => {
  const { loading, uploadImage } = useImageUpload();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const [url, setUrl] = useState<string | undefined>(getValues(name));
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = await uploadImage(file);
      // Keep the previously saved file if the upload failed.
      if (fileUrl) {
        setFileName(file.name);
        setValue(name, fileUrl, { shouldValidate: true });
        setUrl(fileUrl);
      }
    }
  };

  const handleDelete = () => {
    setValue(name, "");
    setFileName("");
    setUrl("");
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      <div
        className={`border border-dashed border-gray-400 rounded-md p-4 h-[200px] flex items-center justify-center ${className}`}
      >
        {url && url !== "" ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {fileName || "Download File"}
              </a>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <input
            {...register(name)}
            type="file"
            accept={accept}
            className="hidden"
            id={name}
            onChange={handleFileChange}
          />
        )}
        {!url && (
          <label htmlFor={name} className="cursor-pointer text-center">
            <span className="text-gray-500">
              {loading ? "Uploading..." : "Click or Drag to upload a file"}
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

export default FileUploadInput;
