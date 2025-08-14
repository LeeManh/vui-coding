import type { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

export interface FileUploadOptions {
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  onFilesChange?: (files: File[]) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

export interface FileUploadContextType {
  files: FileWithPreview[];
  isDragActive: boolean;
  isUploading: boolean;
  options: FileUploadOptions;
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileId: string) => void;
  clearFiles: () => void;
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  open: () => void;
}
