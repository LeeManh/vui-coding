import { useState } from "react";
import { upload } from "@/apis/media.api";
import { resizeImage } from "@/utils/imageUtils";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File, shouldResize: boolean = true): Promise<string> => {
    try {
      setIsUploading(true);

      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("Chỉ chấp nhận file hình ảnh");
      }

      // Validate file size (10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new Error("Kích thước file không được vượt quá 10MB");
      }

      // Resize image if needed
      let processedFile = file;
      if (shouldResize && file.type.startsWith("image/")) {
        processedFile = await resizeImage(file, 1200, 800, 0.85);
      }

      const response = await upload(processedFile);

      // response is already UploadMediaRes (not axios response)
      return response.data.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFromFileInput = (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          try {
            const url = await uploadImage(file);
            resolve(url);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(null);
        }
      };

      input.oncancel = () => {
        resolve(null);
      };

      input.click();
    });
  };

  const uploadFromClipboard = async (items: DataTransferItemList): Promise<string[]> => {
    const imageFiles: File[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          imageFiles.push(file);
        }
      }
    }

    if (imageFiles.length === 0) {
      return [];
    }

    const uploadPromises = imageFiles.map((file) => uploadImage(file));
    return Promise.all(uploadPromises);
  };

  const uploadFromDrop = async (files: FileList): Promise<string[]> => {
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      return [];
    }

    const uploadPromises = imageFiles.map((file) => uploadImage(file));
    return Promise.all(uploadPromises);
  };

  return {
    isUploading,
    uploadImage,
    uploadFromFileInput,
    uploadFromClipboard,
    uploadFromDrop,
  };
};
