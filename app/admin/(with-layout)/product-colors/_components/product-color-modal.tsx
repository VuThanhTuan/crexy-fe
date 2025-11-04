"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductColorForm } from "./product-color-form";
import type { ProductColor } from "@/types/product-color";

interface ProductColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; colorCode: string; description?: string }) => Promise<void>;
  initialData?: ProductColor;
  isSubmitting: boolean;
}

export function ProductColorModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: ProductColorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-dark dark:text-white">
            {initialData ? "Cập nhật màu sắc sản phẩm" : "Thêm màu sắc sản phẩm"}
          </DialogTitle>
        </DialogHeader>
        <ProductColorForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

