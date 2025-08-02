"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/shared/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";

interface UploadAvatarProps {
  username?: string;
  avatar?: string | null;
  onChange?: (avatar: string | null) => void;
}

export function UploadAvatar({ avatar, onChange, username = "" }: UploadAvatarProps) {
  const [avatarImage, setAvatarImage] = useState<string | null>(avatar ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
      onChange?.(imageUrl);
    }
  };

  const handleAvatarDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setAvatarImage(null);
    onChange?.(null);

    // Reset input value to allow uploading the same file again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // sync avatar with avatarImage
  useEffect(() => {
    setAvatarImage(avatar ?? null);
  }, [avatar]);

  return (
    <div className="relative w-32 h-32 rounded-full">
      {avatarImage ? (
        <Avatar className="w-full h-full">
          <AvatarImage src={avatarImage} className="object-cover" />
          <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center group-hover:opacity-100 transition-opacity duration-200 rounded-full">
          <UploadIcon className="w-6 h-6 text-muted-foreground" />
        </div>
      )}

      <label htmlFor="avatar-upload" className="absolute inset-0 cursor-pointer group">
        <input
          id="avatar-upload"
          ref={fileInputRef}
          type="file"
          className="sr-only"
          onChange={handleAvatarUpload}
        />
        {avatarImage && (
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
