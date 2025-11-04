"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductSizeForm } from "./product-size-form";
import type { ProductSize } from "@/types/product-size";

interface ProductSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string }) => Promise<void>;
  initialData?: ProductSize;
  isSubmitting: boolean;
}

export function ProductSizeModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: ProductSizeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-dark dark:text-white">
            {initialData ? "Cập nhật kích thước sản phẩm" : "Thêm kích thước sản phẩm"}
          </DialogTitle>
        </DialogHeader>
        <ProductSizeForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

