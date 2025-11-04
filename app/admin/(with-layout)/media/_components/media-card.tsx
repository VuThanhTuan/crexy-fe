"use client";

import { useState } from "react";
import { PencilIcon, TrashIcon, FileIcon, ImageIcon, VideoIcon } from "lucide-react";
import type { Media } from "@/types/media";

interface MediaCardProps {
  media: Media;
  onEdit: (media: Media) => void;
  onDelete: (media: Media) => void;
}

export function MediaCard({ media, onEdit, onDelete }: MediaCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '-';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d);
  };

  return (
    <div className="group relative rounded-lg border border-stroke bg-white overflow-hidden transition-all hover:shadow-lg dark:border-dark-3 dark:bg-gray-dark">
      {/* Media Preview */}
      <div className="aspect-square bg-gray-2 dark:bg-dark-2 relative overflow-hidden">
        {media.mediaType === 'image' && !imageError ? (
          <img
            src={media.url}
            alt={media.originName}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : media.mediaType === 'video' ? (
          <div className="w-full h-full flex items-center justify-center">
            <VideoIcon className="w-16 h-16 text-dark-6" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileIcon className="w-16 h-16 text-dark-6" />
          </div>
        )}

        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={() => onEdit(media)}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-dark flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            title="Chỉnh sửa"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(media)}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-dark flex items-center justify-center text-red hover:bg-red hover:text-white transition-colors"
            title="Xóa"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Media type badge */}
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-white/90 dark:bg-gray-dark/90 text-dark dark:text-white">
            {media.mediaType === 'image' ? (
              <ImageIcon className="w-3 h-3" />
            ) : (
              <VideoIcon className="w-3 h-3" />
            )}
            {media.mediaType}
          </span>
        </div>
      </div>

      {/* Media Info */}
      <div className="p-3">
        <h3 className="font-medium text-dark dark:text-white truncate mb-1" title={media.originName}>
          {media.originName}
        </h3>
        <div className="space-y-0.5 text-xs text-dark-6">
          <p>{formatFileSize(media.size)}</p>
          {media.width && media.height && (
            <p>{media.width} x {media.height} px</p>
          )}
          <p>{formatDate(media.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

