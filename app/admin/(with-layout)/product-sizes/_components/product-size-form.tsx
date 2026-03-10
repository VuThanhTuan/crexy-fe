"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import type { ProductSize } from "@/types/product-size";
import { useEffect } from "react";

const productSizeSchema = z.object({
  name: z
    .string()
    .min(1, "Tên kích thước không được để trống")
    .max(255, "Tên kích thước không được vượt quá 255 ký tự"),
  description: z.string().optional(),
});

type ProductSizeFormValues = z.infer<typeof productSizeSchema>;

interface ProductSizeFormProps {
  initialData?: ProductSize;
  onSubmit: (data: ProductSizeFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ProductSizeForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProductSizeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductSizeFormValues>({
    resolver: zodResolver(productSizeSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description || "",
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Tên kích thước
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nhập tên kích thước (VD: XL, XXL, M, L...)"
          {...register("name")}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Mô tả
        </label>
        <textarea
          id="description"
          rows={6}
          placeholder="Nhập mô tả về kích thước (không bắt buộc)"
          {...register("description")}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red">{errors.description.message}</p>
        )}
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
          {isSubmitting ? "Đang xử lý..." : initialData ? "Cập nhật" : "Tạo mới"}
        </Button>
      </div>
    </form>
  );
}

