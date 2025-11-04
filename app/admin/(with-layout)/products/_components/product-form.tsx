"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { categoriesService } from "@/services/admin/categories.service";
import type { Category } from "@/types/category";
import type { AxiosError } from "axios";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Tên sản phẩm không được để trống")
    .max(255, "Tên sản phẩm không được vượt quá 255 ký tự"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  discountId: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      isActive: initialData?.isActive ?? true,
      categoryId: initialData?.categoryId || "",
      discountId: initialData?.discountId || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description || "",
        isActive: initialData.isActive ?? true,
        categoryId: initialData.categoryId || "",
        discountId: initialData.discountId || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getAll({ limit: 100 });
        setCategories(response.data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        console.error("Error loading categories:", axiosErr.response?.data?.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Tên sản phẩm */}
      <div>
        <label
          htmlFor="name"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Tên sản phẩm
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nhập tên sản phẩm"
          {...register("name")}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red">{errors.name.message}</p>
        )}
      </div>

      {/* Mô tả */}
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
          placeholder="Nhập mô tả sản phẩm"
          {...register("description")}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red">{errors.description.message}</p>
        )}
      </div>

      {/* Danh mục */}
      <div>
        <label
          htmlFor="categoryId"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Danh mục
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <select
          id="categoryId"
          {...register("categoryId")}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          disabled={isSubmitting || loadingCategories}
        >
          <option value="">
            {loadingCategories ? "Đang tải..." : "-- Chọn danh mục --"}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="mt-1 text-sm text-red">{errors.categoryId.message}</p>
        )}
      </div>

      {/* Trạng thái */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("isActive")}
            className="w-5 h-5 rounded border-stroke bg-transparent text-primary focus:ring-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2"
            disabled={isSubmitting}
          />
          <span className="text-body-sm font-medium text-dark dark:text-white">
            Kích hoạt sản phẩm
          </span>
        </label>
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

