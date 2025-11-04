"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types/category";

// Validation schema
const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, "Tên danh mục không được để trống")
    .max(255, "Tên danh mục không được vượt quá 255 ký tự"),
  slug: z
    .string()
    .max(255, "Slug không được vượt quá 255 ký tự")
    .optional()
    .or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  backgroundImage: z.string().url("URL không hợp lệ").optional().or(z.literal("")),
  parentId: z.string().optional().or(z.literal("")),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  initialData?: Category;
  categories: Category[];
  onSubmit: (data: CategoryFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CategoryForm({
  initialData,
  categories,
  onSubmit,
  onCancel,
  isSubmitting,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      backgroundImage: initialData?.backgroundImage || "",
      parentId: initialData?.parentId || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        slug: initialData.slug || "",
        description: initialData.description || "",
        backgroundImage: initialData.backgroundImage || "",
        parentId: initialData.parentId || "",
      });
    } else {
      reset({
        name: "",
        slug: "",
        description: "",
        backgroundImage: "",
        parentId: "",
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: CategoryFormValues) => {
    // Clean up empty strings to undefined
    const cleanedData = {
      name: data.name,
      slug: data.slug || undefined,
      description: data.description || undefined,
      backgroundImage: data.backgroundImage || undefined,
      parentId: data.parentId || undefined,
    };
    await onSubmit(cleanedData);
  };

  // Filter out current category and its children from parent options
  const availableParentCategories = categories.filter((cat) => {
    if (!initialData) return true;
    return cat.id !== initialData.id;
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Tên danh mục <span className="text-red">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nhập tên danh mục"
          {...register("name")}
          className={`w-full rounded-lg border-[1.5px] bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
            errors.name ? "border-red" : "border-stroke"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red">{errors.name.message}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label
          htmlFor="slug"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Slug
        </label>
        <input
          id="slug"
          type="text"
          placeholder="vd: ao-thun-nam (để trống để tự động tạo)"
          {...register("slug")}
          className={`w-full rounded-lg border-[1.5px] bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
            errors.slug ? "border-red" : "border-stroke"
          }`}
        />
        {errors.slug && (
          <p className="mt-1 text-sm text-red">{errors.slug.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Mô tả
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Nhập mô tả về danh mục"
          {...register("description")}
          className={`w-full rounded-lg border-[1.5px] bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
            errors.description ? "border-red" : "border-stroke"
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red">{errors.description.message}</p>
        )}
      </div>

      {/* Background Image */}
      <div>
        <label
          htmlFor="backgroundImage"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          URL ảnh nền
        </label>
        <input
          id="backgroundImage"
          type="text"
          placeholder="https://example.com/image.jpg"
          {...register("backgroundImage")}
          className={`w-full rounded-lg border-[1.5px] bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
            errors.backgroundImage ? "border-red" : "border-stroke"
          }`}
        />
        {errors.backgroundImage && (
          <p className="mt-1 text-sm text-red">
            {errors.backgroundImage.message}
          </p>
        )}
      </div>

      {/* Parent Category */}
      <div>
        <label
          htmlFor="parentId"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Danh mục cha
        </label>
        <select
          id="parentId"
          {...register("parentId")}
          className={`w-full rounded-lg border-[1.5px] bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
            errors.parentId ? "border-red" : "border-stroke"
          }`}
        >
          <option value="">Không có danh mục cha</option>
          {availableParentCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.parentId && (
          <p className="mt-1 text-sm text-red">{errors.parentId.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? initialData
              ? "Đang cập nhật..."
              : "Đang tạo..."
            : initialData
              ? "Cập nhật"
              : "Tạo mới"}
        </Button>
      </div>
    </form>
  );
}

