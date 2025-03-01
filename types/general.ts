// Interface for toast options
export interface ToastOptions {
  type: "success" | "error" | "warning" | "info";
  message: string;
}
// Interface for form state
export interface IactionState {
  message: string;
  success: boolean;
}

// Interface for form props
