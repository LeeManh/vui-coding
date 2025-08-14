"use client";

import React from "react";
import { Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFileUploadContext } from "../context/FileUploadContext";

interface FileUploadDropzoneProps {
  className?: string;
  children?: React.ReactNode;
  enableClick?: boolean;
  size?: "sm" | "md" | "lg";
}

export const FileUploadDropzone = ({
  className,
  children,
  enableClick = true,
  size = "md",
}: FileUploadDropzoneProps) => {
  const { isDragActive, getRootProps, getInputProps, options, open, files } =
    useFileUploadContext();

  const isMaxFilesReached = Boolean(options.maxFiles) && files.length >= (options.maxFiles || 0);
  const isDisabled = Boolean(options.disabled) || isMaxFilesReached;

  const sizeStyles = {
    sm: {
      container: "p-4",
      icon: "w-8 h-8",
      title: "text-sm",
      meta: "text-xs",
    },
    md: {
      container: "p-6",
      icon: "w-10 h-10",
      title: "text-md",
      meta: "text-sm",
    },
    lg: {
      container: "p-8",
      icon: "w-12 h-12",
      title: "text-lg",
      meta: "text-sm",
    },
  }[size];

  const formatFileTypes = () => {
    if (!options.acceptedFileTypes || options.acceptedFileTypes.length === 0) {
      return "All file types";
    }

    return options.acceptedFileTypes.join(", ");
  };

  const formatFileSize = () => {
    if (!options.maxFileSize) return "";

    const sizeInMB = Math.round(options.maxFileSize / 1024 / 1024);
    return `Max size: ${sizeInMB}MB`;
  };

  return (
    <div
      {...getRootProps()}
      aria-disabled={isDisabled}
      className={cn(
        "relative border-2 border-dashed rounded-lg text-center transition-colors duration-200",
        sizeStyles.container,
        "hover:border-primary/50 hover:bg-muted/25",
        isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25",
        isDisabled && "opacity-60 cursor-not-allowed",
        className
      )}
      onClick={() => {
        if (enableClick && !isDisabled) open();
      }}
    >
      <input {...getInputProps()} />

      {children ? (
        children
      ) : (
        <div className="space-y-4">
          <div className={cn("mx-auto text-muted-foreground", sizeStyles.icon)}>
            {isDragActive ? (
              <FileText className="w-full h-full" />
            ) : (
              <Upload className="w-full h-full" />
            )}
          </div>

          <div className="space-y-2">
            <p className={cn(sizeStyles.title, "font-medium")}>
              {isDragActive ? "Drop files here..." : "Drag & drop files here"}
            </p>

            <div className={cn(sizeStyles.meta, "text-muted-foreground space-y-1")}>
              <p>Accepted: {formatFileTypes()}</p>
              {options.maxFileSize && <p>{formatFileSize()}</p>}
              {options.maxFiles && <p>Max files: {options.maxFiles}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
