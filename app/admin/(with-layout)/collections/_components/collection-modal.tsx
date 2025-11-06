"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CollectionForm } from "./collection-form";
import type { Collection } from "@/types/collection";

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description?: string;
    slug?: string;
    mediaId?: string;
    productIds?: string[];
  }) => Promise<void>;
  initialData?: Collection;
  isSubmitting: boolean;
}

export function CollectionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: CollectionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] bg-white dark:bg-gray-dark max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-dark dark:text-white">
            {initialData ? "Cập nhật bộ sưu tập" : "Thêm bộ sưu tập mới"}
          </DialogTitle>
        </DialogHeader>
        <CollectionForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
