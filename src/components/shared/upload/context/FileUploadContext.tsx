"use client";

import { createContext, useContext } from "react";
import { FileUploadContextType } from "../types";

const FileUploadContext = createContext<FileUploadContextType | null>(null);

export const useFileUploadContext = () => {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error("useFileUploadContext must be used within FileUploadProvider");
  }
  return context;
};

export { FileUploadContext };
