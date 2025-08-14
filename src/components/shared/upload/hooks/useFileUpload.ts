"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FileWithPreview, FileUploadOptions } from "../types";

export const useFileUpload = (options: FileUploadOptions = {}) => {
  const {
    maxFiles = 10,
    acceptedFileTypes = [],
    maxFileSize = 10 * 1024 * 1024, // 10MB default
    onFilesChange,
    onError,
    disabled = false,
  } = options;

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxFileSize && file.size > maxFileSize) {
        return `File size must be less than ${Math.round(maxFileSize / 1024 / 1024)}MB`;
      }

      if (acceptedFileTypes.length > 0) {
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
        const mimeType = file.type;

        const isValidType = acceptedFileTypes.some((type) => {
          if (type.startsWith(".")) {
            return type.toLowerCase() === fileExtension;
          }
          return type === mimeType || mimeType.startsWith(type.replace("*", ""));
        });

        if (!isValidType) {
          return `File type not supported. Accepted types: ${acceptedFileTypes.join(", ")}`;
        }
      }

      return null;
    },
    [maxFileSize, acceptedFileTypes]
  );

  const addFiles = useCallback(
    (newFiles: File[]) => {
      const validFiles: FileWithPreview[] = [];
      const errors: string[] = [];

      newFiles.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          errors.push(`${file.name}: ${error}`);
          return;
        }

        const fileWithPreview: FileWithPreview = Object.assign(file, {
          id: Math.random().toString(36).substr(2, 9),
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        });

        validFiles.push(fileWithPreview);
      });

      if (errors.length > 0) {
        onError?.(errors.join(", "));
      }

      setFiles((currentFiles) => {
        const totalFiles = currentFiles.length + validFiles.length;
        if (totalFiles > maxFiles) {
          const allowedNewFiles = validFiles.slice(0, maxFiles - currentFiles.length);
          if (allowedNewFiles.length < validFiles.length) {
            onError?.(
              `Cannot upload more than ${maxFiles} files. Only ${allowedNewFiles.length} files were added.`
            );
          }
          return [...currentFiles, ...allowedNewFiles];
        }
        return [...currentFiles, ...validFiles];
      });
    },
    [validateFile, maxFiles, onError]
  );

  const removeFile = useCallback((fileId: string) => {
    setFiles((currentFiles) => {
      const fileToRemove = currentFiles.find((f) => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return currentFiles.filter((f) => f.id !== fileId);
    });
  }, []);

  const clearFiles = useCallback(() => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
  }, [files]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: addFiles,
    accept:
      acceptedFileTypes.length > 0
        ? acceptedFileTypes.reduce((acc, type) => {
            acc[type] = [];
            return acc;
          }, {} as Record<string, string[]>)
        : undefined,
    maxFiles,
    maxSize: maxFileSize,
    disabled: disabled || isUploading,
    noClick: true,
    noKeyboard: true,
  });

  useEffect(() => {
    onFilesChange?.(files);
  }, [files, onFilesChange]);

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    files,
    isDragActive,
    isUploading,
    setIsUploading,
    addFiles,
    removeFile,
    clearFiles,
    getRootProps,
    getInputProps,
    open,
    options: {
      maxFiles,
      acceptedFileTypes,
      maxFileSize,
      onFilesChange,
      onError,
      disabled,
    },
  };
};
