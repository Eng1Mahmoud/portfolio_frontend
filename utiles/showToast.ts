import { ToastOptions } from "@/types/types";
import { toast } from "react-toastify";
export const showToast = ({ type, message }: ToastOptions) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast.success(message);
      break;
  }
};
