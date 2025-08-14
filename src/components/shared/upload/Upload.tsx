"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useFileUpload } from "./hooks/useFileUpload";
import { FileUploadContext } from "./context/FileUploadContext";
import { FileUploadOptions } from "./types";
import { FileUploadDropzone } from "./components/FileUploadDropzone";
import { FileUploadTrigger } from "./components/FileUploadTrigger";
import { FileUploadList } from "./components/FileUploadList";

interface UploadProps extends FileUploadOptions {
  children: React.ReactNode;
  className?: string;
}

const Upload = ({ children, className, ...options }: UploadProps) => {
  const fileUploadState = useFileUpload(options);

  return (
    <FileUploadContext.Provider value={fileUploadState}>
      <div className={cn("space-y-4", className)}>{children}</div>
    </FileUploadContext.Provider>
  );
};

Upload.Dropzone = FileUploadDropzone;
Upload.Trigger = FileUploadTrigger;
Upload.List = FileUploadList;

export { Upload };
