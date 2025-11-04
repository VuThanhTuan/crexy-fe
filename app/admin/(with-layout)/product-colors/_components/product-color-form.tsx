"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import type { ProductColor } from "@/types/product-color";
import { useEffect } from "react";

const productColorSchema = z.object({
  name: z
    .string()
    .min(1, "Tên màu sắc không được để trống")
    .max(255, "Tên màu sắc không được vượt quá 255 ký tự"),
  colorCode: z
    .string()
    .min(1, "Mã màu không được để trống")
    .regex(/^#[0-9A-Fa-f]{6}$/, "Mã màu phải là mã HEX hợp lệ (ví dụ: #FF0000)"),
  description: z.string().optional(),
});

type ProductColorFormValues = z.infer<typeof productColorSchema>;

interface ProductColorFormProps {
  initialData?: ProductColor;
  onSubmit: (data: ProductColorFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ProductColorForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProductColorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProductColorFormValues>({
    resolver: zodResolver(productColorSchema),
    defaultValues: {
      name: initialData?.name || "",
      colorCode: initialData?.colorCode || "#000000",
      description: initialData?.description || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        colorCode: initialData.colorCode,
        description: initialData.description || "",
      });
    }
  }, [initialData, reset]);

  const colorCodeValue = watch("colorCode");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Tên màu sắc
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nhập tên màu sắc (VD: Đỏ tươi, Xanh navy...)"
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
          htmlFor="colorCode"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Mã màu
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <div className="flex items-center gap-4">
          {/* HTML5 Color Picker */}
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colorCodeValue}
                onChange={(e) => setValue("colorCode", e.target.value.toUpperCase())}
                className="w-16 h-12 cursor-pointer rounded-lg border-[1.5px] border-stroke dark:border-dark-3"
                disabled={isSubmitting}
                title="Chọn màu"
              />
              <input
                id="colorCode"
                type="text"
                placeholder="#FF0000"
                {...register("colorCode")}
                className="flex-1 rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark uppercase"
                disabled={isSubmitting}
                maxLength={7}
              />
            </div>
          </div>
        </div>
        {errors.colorCode && (
          <p className="mt-1 text-sm text-red">{errors.colorCode.message}</p>
        )}
        <p className="mt-1 text-xs text-dark-6">
          Nhập mã màu HEX (ví dụ: #FF0000) hoặc chọn màu từ color picker
        </p>
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
          placeholder="Nhập mô tả về màu sắc (không bắt buộc)"
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

