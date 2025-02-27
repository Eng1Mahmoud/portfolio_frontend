import { useState } from "react";

export const useImageUpload = () => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    if (!file) throw new Error("No file provided");
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch("http://localhost:10000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImage,
    loading,
  };
};
