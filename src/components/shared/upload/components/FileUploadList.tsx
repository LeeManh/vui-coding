"use client";

import React from "react";
import { X, FileText, Image, File } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { useFileUploadContext } from "../context/FileUploadContext";
import { FileWithPreview } from "../types";

interface FileUploadListProps {
  className?: string;
  showRemoveButton?: boolean;
  showFileSize?: boolean;
  customFileComponent?: (file: FileWithPreview, onRemove: () => void) => React.ReactNode;
}

export const FileUploadList = ({
  className,
  showRemoveButton = true,
  showFileSize = true,
  customFileComponent,
}: FileUploadListProps) => {
  const { files, removeFile } = useFileUploadContext();

  if (files.length === 0) {
    return null;
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (file: FileWithPreview) => {
    if (file.type.startsWith("image/")) {
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image className="w-5 h-5 text-blue-500" />;
    }
    if (file.type.startsWith("text/")) {
      return <FileText className="w-5 h-5 text-green-500" />;
    }
    return <File className="w-5 h-5 text-gray-500" />;
  };

  const renderFilePreview = (file: FileWithPreview) => {
    if (file.preview && file.type.startsWith("image/")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={file.preview}
          alt={file.name}
          className="w-12 h-12 object-cover rounded-md"
          onLoad={() => URL.revokeObjectURL(file.preview!)}
        />
      );
    }

    return (
      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
        {getFileIcon(file)}
      </div>
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      <h4 className="text-sm font-medium text-muted-foreground">Uploaded Files ({files.length})</h4>

      <div className="space-y-2">
        {files.map((file) => {
          const handleRemove = () => removeFile(file.id);

          if (customFileComponent) {
            return <div key={file.id}>{customFileComponent(file, handleRemove)}</div>;
          }

          return (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border"
            >
              {renderFilePreview(file)}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                {showFileSize && (
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                )}
              </div>

              {showRemoveButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={handleRemove}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
