import { UploadMediaRes } from "@/types/media.type";
import { apiClient } from "./api-client";

export const upload = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post<UploadMediaRes>("/medias/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
