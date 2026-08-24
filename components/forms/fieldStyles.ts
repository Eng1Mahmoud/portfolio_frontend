import { FieldVariant } from "@/types/forms";

// Shared by InputField and TextArea so the two surfaces stay in sync.
export const fieldBase = [
  "w-full px-4 py-3 rounded-lg border-2",
  "transition-all duration-300",
  "focus:outline-none focus:ring-2",
].join(" ");

/*
  Both variants now sit on the dark ground — the dashboard was restyled to
  match the public site, so "light" no longer describes a light field. The name
  is kept because it is what selects a *visible* label (see InputField), which
  is the real difference between the two: the public site labels for assistive
  tech only, the dashboard labels on screen. Its surface is a shade brighter so
  a form still reads as a distinct object on the panel behind it.
*/
export const fieldVariants: Record<FieldVariant, string> = {
  dark: [
    "bg-parchment/[0.03] backdrop-blur-sm text-ink-strong placeholder-ink-muted",
    "border-parchment/10 hover:border-parchment/20",
    "focus:border-sage focus:ring-sage/30",
  ].join(" "),
  light: [
    "bg-surface-well/60 text-ink-strong placeholder-ink-muted",
    "border-parchment/10 hover:border-parchment/25",
    "focus:border-sage focus:ring-sage/30",
    // Native pickers and file buttons render white-on-white otherwise.
    "[color-scheme:dark]",
  ].join(" "),
};

export const fieldError =
  "border-red-500 focus:border-red-500 focus:ring-red-500/20";

export const labelVariants: Record<FieldVariant, string> = {
  dark: "text-gray-200",
  light: "text-ink-body",
};
