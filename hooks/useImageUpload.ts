import { useState } from "react";
import { uploadFileAction } from "@/actions/uploadFile";
import { showToast } from "@/utiles/showToast";
export const useImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const uploadImage = async (file: File): Promise<string | undefined> => {
    if (!file) throw new Error("No file provided");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const result = await uploadFileAction(formData);

      // The action reports failure by returning success:false rather than
      // throwing, so the catch below never sees it — check the result.
      if (!result?.success || !result.url) {
        showToast({
          type: "error",
          message: result?.message || "Upload failed",
        });
        return undefined;
      }

      showToast({ type: "success", message: "File uploaded successfully!" });
      return result.url as string;
    } catch {
      showToast({ type: "error", message: "Something went wrong" });
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return {
    uploadImage,
    loading,
  };
};
