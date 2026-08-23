import { FieldVariant } from "@/types/forms";

// Shared by InputField and TextArea so the two surfaces stay in sync.
export const fieldBase = [
  "w-full px-4 py-3 rounded-lg border-2",
  "transition-all duration-300",
  "focus:outline-none focus:ring-2",
].join(" ");

export const fieldVariants: Record<FieldVariant, string> = {
  dark: [
    "bg-parchment/[0.03] backdrop-blur-sm text-ink-strong placeholder-ink-muted",
    "border-parchment/10 hover:border-parchment/20",
    "focus:border-sage focus:ring-sage/30",
  ].join(" "),
  light: [
    "bg-white text-gray-800 placeholder-gray-500",
    "border-gray-300 hover:border-gray-400",
    "focus:border-sage focus:ring-sage/30",
  ].join(" "),
};

export const fieldError =
  "border-red-500 focus:border-red-500 focus:ring-red-500/20";

export const labelVariants: Record<FieldVariant, string> = {
  dark: "text-gray-200",
  light: "text-gray-700",
};
