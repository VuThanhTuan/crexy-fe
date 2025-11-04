"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import type { Media } from "@/types/media";
import { useEffect } from "react";

const mediaEditSchema = z.object({
  originName: z
    .string()
    .min(1, "Tên file không được để trống")
    .max(255, "Tên file không được vượt quá 255 ký tự"),
});

type MediaEditFormValues = z.infer<typeof mediaEditSchema>;

interface MediaEditFormProps {
  media: Media;
  onSubmit: (data: MediaEditFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function MediaEditForm({
  media,
  onSubmit,
  onCancel,
  isSubmitting,
}: MediaEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MediaEditFormValues>({
    resolver: zodResolver(mediaEditSchema),
    defaultValues: {
      originName: media.originName,
    },
  });

  useEffect(() => {
    reset({
      originName: media.originName,
    });
  }, [media, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Preview */}
      <div className="flex justify-center">
        {media.mediaType === 'image' ? (
          <img
            src={media.url}
            alt={media.originName}
            className="max-w-full max-h-[300px] rounded-lg object-contain border border-stroke dark:border-dark-3"
          />
        ) : (
          <video
            src={media.url}
            className="max-w-full max-h-[300px] rounded-lg object-contain border border-stroke dark:border-dark-3"
            controls
          />
        )}
      </div>

      {/* File info */}
      <div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-gray-2 dark:bg-dark-2">
        <div>
          <p className="text-sm text-dark-6">Loại</p>
          <p className="font-medium text-dark dark:text-white capitalize">
            {media.mediaType}
          </p>
        </div>
        <div>
          <p className="text-sm text-dark-6">Kích thước</p>
          <p className="font-medium text-dark dark:text-white">
            {media.size ? `${(media.size / 1024).toFixed(2)} KB` : '-'}
          </p>
        </div>
        {media.width && media.height && (
          <div>
            <p className="text-sm text-dark-6">Kích thước ảnh</p>
            <p className="font-medium text-dark dark:text-white">
              {media.width} x {media.height} px
            </p>
          </div>
        )}
        <div>
          <p className="text-sm text-dark-6">MIME Type</p>
          <p className="font-medium text-dark dark:text-white">
            {media.mimeType}
          </p>
        </div>
      </div>

      {/* Origin Name field */}
      <div>
        <label
          htmlFor="originName"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Tên file
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <input
          id="originName"
          type="text"
          placeholder="Nhập tên file"
          {...register("originName")}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          disabled={isSubmitting}
        />
        {errors.originName && (
          <p className="mt-1 text-sm text-red">{errors.originName.message}</p>
        )}
        <p className="mt-1 text-xs text-dark-6">
          Đây là tên hiển thị của file, bạn có thể thay đổi để dễ quản lý
        </p>
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
      </div>
    </form>
  );
}

