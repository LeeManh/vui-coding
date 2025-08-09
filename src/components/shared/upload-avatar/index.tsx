"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/shared/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";

type Avatar = string | File | null;

interface UploadAvatarProps {
  username?: string;
  avatar?: Avatar;
  onChange?: (avatar: Avatar) => void;
  isLoading?: boolean;
}

export function UploadAvatar(props: UploadAvatarProps) {
  const { avatar, onChange, username = "", isLoading = false } = props;

  const [avatarImage, setAvatarImage] = useState<Avatar>(avatar ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const imageUrl = useMemo(() => {
    if (!avatarImage) return undefined;

    if (typeof avatarImage === "string") {
      // Clean up previous object URL if exists
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      return avatarImage;
    }

    // Create new object URL for File
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    objectUrlRef.current = URL.createObjectURL(avatarImage as File);
    return objectUrlRef.current;
  }, [avatarImage]);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarImage(file);
      onChange?.(file);
    }
  };

  const handleAvatarDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Clean up object URL if exists
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setAvatarImage(null);
    onChange?.(null);

    // Reset input value to allow uploading the same file again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // sync avatar with avatarImage - only when it's actually different
  useEffect(() => {
    const nextAvatar = avatar ?? null;
    if (nextAvatar !== avatarImage) {
      setAvatarImage(nextAvatar);
    }
  }, [avatar, avatarImage]);

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-32 h-32 rounded-full">
      {imageUrl ? (
        <Avatar className="w-full h-full">
          <AvatarImage src={imageUrl} className="object-cover" />
          <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center group-hover:opacity-100 transition-opacity duration-200 rounded-full">
          <UploadIcon className="w-6 h-6 text-muted-foreground" />
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full z-20">
          <div className="animate-spin rounded-full h-8 w-8 border-3 border-white border-t-transparent"></div>
        </div>
      )}

      <label
        htmlFor="avatar-upload"
        className={`absolute inset-0 cursor-pointer group ${
          isLoading ? "pointer-events-none" : ""
        }`}
      >
        <input
          id="avatar-upload"
          ref={fileInputRef}
          type="file"
          className="sr-only"
          onChange={handleAvatarUpload}
          disabled={isLoading}
        />
        {avatarImage && !isLoading && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full cursor-pointer"
              onClick={handleAvatarDelete}
            >
              <TrashIcon className="w-6 h-6 text-muted-foreground" />
            </Button>
          </div>
        )}
      </label>
    </div>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
