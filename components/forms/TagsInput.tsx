"use client";
import { useState, type KeyboardEvent } from "react";
import { useController, useFormContext } from "react-hook-form";
import clsx from "clsx";
import { FaTimes } from "react-icons/fa";
import { FieldVariant } from "@/types/forms";
import {
  fieldBase,
  fieldError,
  fieldVariants,
  labelVariants,
} from "./fieldStyles";

interface TagsInputProps {
  name: string;
  label: string;
  variant?: FieldVariant;
  placeholder?: string;
}

/**
 * Free-form tag entry backed by a string[] form value.
 * Enter or comma commits a tag; Backspace on an empty input removes the last.
 */
const TagsInput = ({
  name,
  label,
  variant = "dark",
  placeholder = "Type a technology and press Enter",
}: TagsInputProps) => {
  const { control } = useFormContext();
  // useController registers the field, so the value is part of the form state
  // and the component re-renders on change. setValue + watch alone do not
  // register it, which left the control inert.
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control, defaultValue: [] });
  const [draft, setDraft] = useState("");

  const tags: string[] = Array.isArray(value) ? value : [];
  const hasError = Boolean(error);
  const errorId = `${name}-error`;

  const commit = (raw: string) => {
    const tag = raw.trim().replace(/,$/, "").trim();
    if (!tag) return;
    // Case-insensitive de-dupe so "React" and "react" don't both appear.
    if (tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...tags, tag]);
    setDraft("");
  };

  const removeAt = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      // Enter must not submit the surrounding form.
      event.preventDefault();
      commit(draft);
      return;
    }
    if (event.key === "Backspace" && draft === "" && tags.length) {
      removeAt(tags.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className={clsx("text-sm font-medium", labelVariants[variant])}
      >
        {label}
      </label>

      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label={`${label} selected`}>
          {tags.map((tag, index) => (
            <li
              key={`${tag}-${index}`}
              className={clsx(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                variant === "light"
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "bg-blue-900/40 text-blue-200 border border-blue-500/30",
              )}
            >
              {tag}
              <button
                type="button"
                onClick={() => removeAt(index)}
                aria-label={`Remove ${tag}`}
                className="rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <FaTimes className="h-2.5 w-2.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <input
        id={name}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        // Commit whatever is half-typed when focus leaves, so a tag isn't lost.
        onBlur={() => {
          commit(draft);
          onBlur();
        }}
        ref={ref}
        placeholder={placeholder}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={clsx(
          fieldBase,
          fieldVariants[variant],
          hasError && fieldError,
        )}
      />

      {hasError && (
        <p id={errorId} role="alert" className="text-red-500 text-sm pl-2">
          {error?.message as string}
        </p>
      )}
    </div>
  );
};

export default TagsInput;
