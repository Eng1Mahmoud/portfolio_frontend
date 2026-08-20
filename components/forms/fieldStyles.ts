import { FieldVariant } from "@/types/forms";

// Shared by InputField and TextArea so the two surfaces stay in sync.
export const fieldBase = [
  "w-full px-4 py-3 rounded-lg border-2",
  "transition-all duration-300",
  "focus:outline-none focus:ring-2",
].join(" ");

export const fieldVariants: Record<FieldVariant, string> = {
  dark: [
    "bg-white/[0.03] backdrop-blur-sm text-ink-strong placeholder-ink-muted",
    "border-white/10 hover:border-white/20",
    "focus:border-cyan-400 focus:ring-cyan-400/20",
  ].join(" "),
  light: [
    "bg-white text-gray-800 placeholder-gray-500",
    "border-gray-300 hover:border-gray-400",
    "focus:border-cyan-400 focus:ring-cyan-400/20",
  ].join(" "),
};

export const fieldError =
  "border-red-500 focus:border-red-500 focus:ring-red-500/20";

export const labelVariants: Record<FieldVariant, string> = {
  dark: "text-gray-200",
  light: "text-gray-700",
};
