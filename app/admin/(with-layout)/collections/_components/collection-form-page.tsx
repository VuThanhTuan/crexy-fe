"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import type { Collection, ProductInCollection } from "@/types/collection";
import { useEffect, useState } from "react";
import { MediaPickerModal, ImageSelector } from "@/components/MediaPicker";
import type { Media } from "@/types/media";
import type { Product } from "@/types/product";
import { ProductSelectModal } from "./product-select-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const collectionSchema = z.object({
  name: z
    .string()
    .min(1, "Tên bộ sưu tập không được để trống")
    .max(255, "Tên bộ sưu tập không được vượt quá 255 ký tự"),
  description: z.string().optional(),
  slug: z.string().optional(),
  mediaId: z.string().optional(),
});

type CollectionFormValues = z.infer<typeof collectionSchema>;

interface CollectionFormPageProps {
  initialData?: Collection;
  onSubmit: (data: {
    name: string;
    description?: string;
    slug?: string;
    mediaId?: string;
    productIds?: string[];
  }) => Promise<void>;
  isSubmitting: boolean;
}

export function CollectionFormPage({
  initialData,
  onSubmit,
  isSubmitting,
}: CollectionFormPageProps) {
  const router = useRouter();
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
  const [products, setProducts] = useState<ProductInCollection[]>(
    initialData?.products || []
  );
  const [isProductSelectModalOpen, setIsProductSelectModalOpen] = useState(false);

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
      });
      setSelectedMedia(initialData.media ? {
        ...initialData.media,
        originName: initialData.media.name,
        mediaType: 'image' as const,
        mimeType: initialData.media.mimeType || 'image/jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      } : null);
      setProducts(initialData.products || []);
    }
  }, [initialData, reset]);

  const handleMediaSelect = (media: Media) => {
    setSelectedMedia(media);
    setValue("mediaId", media.id);
    setIsMediaPickerOpen(false);
  };

  const handleRemoveMedia = () => {
    setSelectedMedia(null);
    setValue("mediaId", "");
  };

  const handleAddProduct = (product: Product) => {
    // Kiểm tra xem sản phẩm đã có chưa
    if (!products.find((p) => p.id === product.id)) {
      const productInCollection: ProductInCollection = {
        id: product.id,
        name: product.name,
        price: product.price,
        primaryImage: product.primaryImage ? {
          id: product.primaryImage.id,
          name: product.primaryImage.name,
          originName: product.primaryImage.originName,
          url: product.primaryImage.url,
          mediaType: product.primaryImage.mediaType,
          mimeType: product.primaryImage.mimeType,
          size: product.primaryImage.size,
          width: product.primaryImage.width,
          height: product.primaryImage.height,
        } : undefined
      };
      setProducts([...products, productInCollection]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const onFormSubmit = async (data: CollectionFormValues) => {
    const productIds = products.map((p) => p.id);
    await onSubmit({
      ...data,
      productIds,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Basic Info Section */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6">
          <h2 className="text-xl font-bold text-dark dark:text-white mb-6">
            Thông tin cơ bản
          </h2>

          <div className="space-y-5">
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
                <p className="mt-1 text-sm text-red">
                  {errors.description.message}
                </p>
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
          </div>
        </div>

        {/* Products Section */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Danh sách sản phẩm
            </h2>
            <Button
              type="button"
              onClick={() => setIsProductSelectModalOpen(true)}
              disabled={isSubmitting}
              size="sm"
            >
              Thêm sản phẩm
            </Button>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-8 text-dark-6 dark:text-gray-400">
              Chưa có sản phẩm nào. Nhấn &quot;Thêm sản phẩm&quot; để thêm sản phẩm vào bộ sưu tập.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
                    <TableHead className="min-w-[80px]">Ảnh</TableHead>
                    <TableHead className="min-w-[200px]">Tên sản phẩm</TableHead>
                    <TableHead className="min-w-[150px]">Giá</TableHead>
                    <TableHead className="text-right min-w-[100px]">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow
                      key={product.id}
                      className="border-[#eee] dark:border-dark-3"
                    >
                      <TableCell>
                        {product.primaryImage?.url ? (
                          <div className="flex items-center justify-center">
                            <img
                              src={product.primaryImage.url}
                              alt={product.primaryImage.originName || product.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 dark:bg-dark-2">
                            <span className="text-xs text-dark-6 dark:text-dark-6">
                              No image
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-dark dark:text-white">
                          {product.name}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-dark dark:text-white">
                          {product.price?.toLocaleString("vi-VN") || "-"} VNĐ
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(product.id)}
                            disabled={isSubmitting}
                            className="text-red hover:text-red-dark transition-colors"
                            title="Xóa khỏi bộ sưu tập"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Đang xử lý..."
              : initialData
              ? "Cập nhật"
              : "Tạo mới"}
          </Button>
        </div>
      </form>

      {/* Modals */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleMediaSelect}
        selectedMediaId={mediaId}
        mediaType="image"
      />

      <ProductSelectModal
        isOpen={isProductSelectModalOpen}
        onClose={() => setIsProductSelectModalOpen(false)}
        onSelect={handleAddProduct}
        excludedProductIds={products.map((p) => p.id)}
      />
    </div>
  );
}
