"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DiscountForm } from "./discount-form";
import type { Discount } from "@/types/discount";

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    value?: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
  }) => Promise<void>;
  initialData?: Discount;
  isSubmitting: boolean;
}

export function DiscountModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: DiscountModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-dark">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-dark dark:text-white">
            {initialData ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}
          </DialogTitle>
        </DialogHeader>
        <DiscountForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

