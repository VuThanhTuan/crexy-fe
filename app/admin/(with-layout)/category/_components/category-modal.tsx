"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryForm, type CategoryFormValues } from "./category-form";
import type { Category } from "@/types/category";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormValues) => Promise<void>;
  initialData?: Category;
  categories: Category[];
  isSubmitting: boolean;
}

export function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories,
  isSubmitting,
}: CategoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-dark max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-dark dark:text-white">
            {initialData ? "Cập nhật danh mục" : "Thêm danh mục mới"}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm
          initialData={initialData}
          categories={categories}
          onSubmit={onSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

