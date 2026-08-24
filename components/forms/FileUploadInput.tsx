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
      <label htmlFor={name} className="text-sm font-medium text-ink-body">
        {label}
      </label>
      <div
        className={`flex h-[200px] items-center justify-center rounded-lg border border-dashed border-parchment/20 bg-surface-well/40 p-4 transition-colors hover:border-sage/40 ${className}`}
      >
        {url && url !== "" ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sage underline transition-colors hover:text-sage-bright"
              >
                {fileName || "Download file"}
              </a>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
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
            <span className="text-sm text-ink-muted">
              {loading ? "Uploading…" : "Click or drag to upload a file"}
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
