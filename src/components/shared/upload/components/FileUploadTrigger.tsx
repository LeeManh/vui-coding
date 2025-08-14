"use client";

import React from 'react';
import { Button } from '@/components/shared/Button';
import { Upload } from 'lucide-react';
import { useFileUploadContext } from '../context/FileUploadContext';

interface FileUploadTriggerProps {
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  asChild?: boolean;
}

export const FileUploadTrigger = ({ 
  children, 
  variant = "outline",
  size = "default",
  className,
  asChild = false,
  ...props 
}: FileUploadTriggerProps) => {
  const { open, options, files } = useFileUploadContext();

  const isMaxFilesReached = options.maxFiles && files.length >= options.maxFiles;

  const handleClick = () => {
    if (!options.disabled && !isMaxFilesReached) {
      open();
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      disabled: options.disabled || isMaxFilesReached,
      ...props
    });
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      disabled={options.disabled || isMaxFilesReached}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          <Upload className="w-4 h-4 mr-2" />
          {isMaxFilesReached ? "Max files reached" : "Choose Files"}
        </>
      )}
    </Button>
  );
};