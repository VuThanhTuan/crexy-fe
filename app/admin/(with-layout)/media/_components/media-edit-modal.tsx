"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MediaEditForm } from "./media-edit-form";
import type { Media } from "@/types/media";

interface MediaEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { originName: string }) => Promise<void>;
  media: Media;
  isSubmitting: boolean;
}

export function MediaEditModal({
  isOpen,
  onClose,
  onSubmit,
  media,
  isSubmitting,
}: MediaEditModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-dark dark:text-white">
            Cập nhật Media
          </DialogTitle>
        </DialogHeader>
        <MediaEditForm
          media={media}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

