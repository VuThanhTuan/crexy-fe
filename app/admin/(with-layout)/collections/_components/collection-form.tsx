"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import type { Collection } from "@/types/collection";
import { useEffect, useState } from "react";
import { MediaPickerModal, ImageSelector } from "@/components/MediaPicker";
import type { Media } from "@/types/media";
import { productsService } from "@/services/admin/products.service";
import type { Product } from "@/types/product";
import type { AxiosError } from "axios";
import { CheckIcon } from "lucide-react";

const collectionSchema = z.object({
  name: z
    .string()
    .min(1, "Tên bộ sưu tập không được để trống")
    .max(255, "Tên bộ sưu tập không được vượt quá 255 ký tự"),
  description: z.string().optional(),
  slug: z.string().optional(),
  mediaId: z.string().optional(),
  productIds: z.array(z.string()).optional(),
});

type CollectionFormValues = z.infer<typeof collectionSchema>;

interface CollectionFormProps {
  initialData?: Collection;
  onSubmit: (data: CollectionFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CollectionForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: CollectionFormProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(
    initialData?.media ? {
      ...initialData.media,
      originName: initialData.media.name,
      mediaType: 'image' as const,
      mimeType: initialData.media.mimeType || 'image/jpeg',
      createdAt: new Date(),
      updatedAt: new Date()
    } : null
  );
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    initialData?.products?.map((p) => p.id) || []
  );
  const [searchQuery, setSearchQuery] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      slug: initialData?.slug || "",
      mediaId: initialData?.media?.id || "",
      productIds: initialData?.products?.map((p) => p.id) || [],
    },
  });

  const mediaId = watch("mediaId");

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description || "",
        slug: initialData.slug || "",
        mediaId: initialData.media?.id || "",
        productIds: initialData.products?.map((p) => p.id) || [],
      });
      setSelectedMedia(initialData.media ? {
        ...initialData.media,
        originName: initialData.media.name,
        mediaType: 'image' as const,
        mimeType: initialData.media.mimeType || 'image/jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      } : null);
      setSelectedProductIds(initialData.products?.map((p) => p.id) || []);
    }
  }, [initialData, reset]);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await productsService.getAll({
          page: 1,
          limit: 1000, // Get all products for selection
        });
        setProducts(response.data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        console.error("Error loading products:", axiosErr);
      } finally {
        setLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  const handleMediaSelect = (media: Media) => {
    setSelectedMedia(media);
    setValue("mediaId", media.id);
    setIsMediaPickerOpen(false);
  };

  const handleRemoveMedia = () => {
    setSelectedMedia(null);
    setValue("mediaId", "");
  };

  const toggleProductSelection = (productId: string) => {
    const newSelected = selectedProductIds.includes(productId)
      ? selectedProductIds.filter((id) => id !== productId)
      : [...selectedProductIds, productId];
    setSelectedProductIds(newSelected);
    setValue("productIds", newSelected);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Tên bộ sưu tập
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nhập tên bộ sưu tập"
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
          htmlFor="slug"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Slug URL
        </label>
        <input
          id="slug"
          type="text"
          placeholder="bo-suu-tap-mua-he-2024"
          {...register("slug")}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          disabled={isSubmitting}
        />
        {errors.slug && (
          <p className="mt-1 text-sm text-red">{errors.slug.message}</p>
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
          placeholder="Nhập mô tả về bộ sưu tập (không bắt buộc)"
          {...register("description")}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          Hình đại diện
        </label>
        <ImageSelector
          media={selectedMedia}
          onSelect={() => setIsMediaPickerOpen(true)}
          onRemove={handleRemoveMedia}
          className="w-32"
          disabled={isSubmitting}
        />
        <input type="hidden" {...register("mediaId")} />
      </div>

      <div>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          Chọn sản phẩm
        </label>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            disabled={isSubmitting || loadingProducts}
          />
          <div className="max-h-64 overflow-y-auto rounded-lg border-[1.5px] border-stroke dark:border-dark-3 p-3">
            {loadingProducts ? (
              <p className="text-center text-dark-6 py-4">Đang tải sản phẩm...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center text-dark-6 py-4">Không tìm thấy sản phẩm</p>
            ) : (
              <div className="space-y-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border border-stroke dark:border-dark-3 p-3 hover:bg-gray-2 dark:hover:bg-dark-2 cursor-pointer"
                    onClick={() => !isSubmitting && toggleProductSelection(product.id)}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-dark dark:text-white">
                        {product.name}
                      </p>
                      <p className="text-sm text-dark-6">
                        {product.price ? product.price.toLocaleString("vi-VN") : "-"} VNĐ
                      </p>
                    </div>
                    {selectedProductIds.includes(product.id) && (
                      <CheckIcon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedProductIds.length > 0 && (
            <p className="text-sm text-dark-6">
              Đã chọn {selectedProductIds.length} sản phẩm
            </p>
          )}
        </div>
        <input type="hidden" {...register("productIds")} />
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

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleMediaSelect}
        selectedMediaId={mediaId}
        mediaType="image"
      />
    </form>
  );
}
