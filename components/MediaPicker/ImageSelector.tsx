"use client";

import { useEffect, useState } from "react";
import { ImageIcon, XIcon } from "lucide-react";
import type { Media } from "@/types/media";

interface ImageSelectorProps {
  media: Media | null;
  onSelect: () => void;
  onRemove?: () => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ImageSelector({
  media,
  onSelect,
  onRemove,
  label,
  required = false,
  disabled = false,
  className = "",
}: ImageSelectorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={className}>
        {label && (
          <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
            {label}
            {required && <span className="ml-1 select-none text-red">*</span>}
          </label>
        )}
        <div className="w-full aspect-square rounded-lg border-2 border-dashed border-stroke dark:border-dark-3 bg-gray-2 dark:bg-dark-2" />
      </div>
    );
  }
  return (
    <div className={className}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
          {label}
          {required && <span className="ml-1 select-none text-red">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={onSelect}
          disabled={disabled}
          className={`group relative w-full aspect-square rounded-lg border-2 border-dashed overflow-hidden transition-all ${
            media
              ? "border-stroke dark:border-dark-3 hover:border-primary"
              : "border-stroke dark:border-dark-3 hover:border-primary bg-gray-2 dark:bg-dark-2"
          } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        >
          {media ? (
            <>
              {/* Image Preview */}
              <img
                src={media.url}
                alt={media.originName}
                className="w-full h-full object-cover"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium">Thay đổi ảnh</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <ImageIcon className="w-8 h-8 text-dark-6 mb-2" />
              <span className="text-sm text-dark-6">Chọn ảnh</span>
            </div>
          )}
        </button>

        {/* Remove button */}
        {media && onRemove && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red flex items-center justify-center text-white hover:bg-red-dark transition-colors shadow-lg"
            title="Xóa ảnh"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {media && (
        <p className="mt-1 text-xs text-dark-6 truncate" title={media.originName}>
          {media.originName}
        </p>
      )}
    </div>
  );
}

