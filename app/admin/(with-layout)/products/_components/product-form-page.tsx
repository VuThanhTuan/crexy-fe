"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/RichTextEditor";
import { MediaPickerModal } from "@/components/MediaPicker";
import { ImageSelector } from "@/components/MediaPicker";
import type { Product } from "@/types/product";
import type { Media } from "@/types/media";
import { useEffect, useState } from "react";
import { categoriesService } from "@/services/admin/categories.service";
import { productSizesService } from "@/services/admin/product-sizes.service";
import { productColorsService } from "@/services/admin/product-colors.service";
import { discountsService } from "@/services/admin/discounts.service";
import type { Category } from "@/types/category";
import type { ProductSize } from "@/types/product-size";
import type { ProductColor } from "@/types/product-color";
import type { Discount } from "@/types/discount";
import type { AxiosError } from "axios";
import { PlusIcon, EditIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Tên sản phẩm không được để trống")
    .max(255, "Tên sản phẩm không được vượt quá 255 ký tự"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  discountId: z.string().optional(),
  price: z
    .number("Giá phải là số")
    .min(0, "Giá phải lớn hơn hoặc bằng 0"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormPageProps {
  initialData?: Product;
  onSubmit: (data: {
    name: string;
    description?: string;
    isActive?: boolean;
    categoryId: string;
    discountId?: string | null;
    price: number;
    mediaItems: {
      mediaId: string;
      mediaCategory: string;
    }[];
    variants: {
      sizeId: string;
      colorId: string;
      isActive: boolean;
      price: number;
    }[];
    productAttributes?: {
      name: string;
      value: string;
    }[];
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const MEDIA_CATEGORY = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SLIDER: "slider",
} as const;

type MediaPickerTarget = "primary" | "secondary" | "slider" | { type: "slide"; index: number };

const MAX_SLIDE_IMAGES = 10;
const DEFAULT_SLIDE_SLOTS = 4;

export default function ProductFormPage({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProductFormPageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [sizes, setSizes] = useState<ProductSize[]>([]);
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [colors, setColors] = useState<ProductColor[]>([]);
  const [loadingColors, setLoadingColors] = useState(true);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);
  const [variants, setVariants] = useState<Array<{ sizeId: string; colorId: string; isActive: boolean; price: number; id?: string }>>([]);
  const [attributes, setAttributes] = useState<Array<{ name: string; value: string; id?: string }>>([]);
  const [description, setDescription] = useState(initialData?.description || "");

  // Media states
  const [mainImage, setMainImage] = useState<Media | null>(null);
  const [secondaryImage, setSecondaryImage] = useState<Media | null>(null);
  const [slideImages, setSlideImages] = useState<(Media | null)[]>(
    Array(DEFAULT_SLIDE_SLOTS).fill(null)
  );

  // Media picker state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [currentPickerTarget, setCurrentPickerTarget] = useState<MediaPickerTarget | null>(null);

  // Attribute modal state
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [editingAttributeIndex, setEditingAttributeIndex] = useState<number | null>(null);
  const [attributeFormData, setAttributeFormData] = useState<{
    name: string;
    value: string;
  }>({
    name: "",
    value: "",
  });

  // Variant modal state
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(null);
  const [variantFormData, setVariantFormData] = useState<{
    sizeId: string;
    colorId: string;
    isActive: boolean;
    price: number;
  }>({
    sizeId: "",
    colorId: "",
    isActive: true,
    price: 0,
  });

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
      price: initialData?.price ?? 0,
    },
  });

  // Load initial media if editing
  useEffect(() => {
    if (initialData?.productMedia && initialData.productMedia.length > 0) {
      const mediaItems = initialData.productMedia;
      
      // Find main image (preview)
      const main = mediaItems.find(m => m.mediaCategory === MEDIA_CATEGORY.PRIMARY);
      if (main?.media) {
        setMainImage(main.media as Media);
      }

      // Find thumbnail (detail_list - first one)
      const thumbnail = mediaItems.find(m => m.mediaCategory === MEDIA_CATEGORY.SECONDARY);
      if (thumbnail?.media) {
        setSecondaryImage(thumbnail.media as Media);
      }

      // Find slide images (detail)
      const slides = mediaItems
        .filter(m => m.mediaCategory === MEDIA_CATEGORY.SLIDER)
        .map(m => m.media as Media);
      
      if (slides.length > 0) {
        const newSlideImages = [...Array(Math.max(DEFAULT_SLIDE_SLOTS, slides.length))].map(
          (_, index) => slides[index] || null
        );
        setSlideImages(newSlideImages);
      }
    }
  }, [initialData]);

  // Load initial attributes if editing
  useEffect(() => {
    if (initialData?.productAttributes && initialData.productAttributes.length > 0) {
      const initialAttributes = initialData.productAttributes.map((attribute) => ({
        name: attribute.name,
        value: attribute.value,
        id: attribute.id,
      }));
      setAttributes(initialAttributes);
    }
  }, [initialData]);

  // Load initial variants if editing
  useEffect(() => {
    if (initialData?.productVariants && initialData.productVariants.length > 0) {
      const initialVariants = initialData.productVariants.map((variant) => ({
        sizeId: variant.productSizeId || "",
        colorId: variant.productColorId || "",
        isActive: variant.isActive,
        price: variant.price ?? 0,
        id: variant.id,
      }));
      setVariants(initialVariants);
    }
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

  // Fetch sizes
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await productSizesService.getAll({ limit: 100 });
        setSizes(response.data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        console.error("Error loading sizes:", axiosErr.response?.data?.message);
      } finally {
        setLoadingSizes(false);
      }
    };
    fetchSizes();
  }, []);

  // Fetch colors
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await productColorsService.getAll({ limit: 100 });
        setColors(response.data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        console.error("Error loading colors:", axiosErr.response?.data?.message);
      } finally {
        setLoadingColors(false);
      }
    };
    fetchColors();
  }, []);

  // Fetch discounts
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await discountsService.getAll({ limit: 100 });
        setDiscounts(response.data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        console.error("Error loading discounts:", axiosErr.response?.data?.message);
      } finally {
        setLoadingDiscounts(false);
      }
    };
    fetchDiscounts();
  }, []);

  // Reset form when initialData is available AND options are loaded
  useEffect(() => {
    if (initialData && !loadingCategories && !loadingDiscounts) {
      reset({
        name: initialData.name,
        description: initialData.description || "",
        isActive: initialData.isActive ?? true,
        categoryId: initialData.categoryId || "",
        discountId: initialData.discountId || "",
        price: initialData.price ?? 0,
      });
      setDescription(initialData.description || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, loadingCategories, loadingDiscounts]);

  // Handle media picker
  const handleOpenMediaPicker = (target: MediaPickerTarget) => {
    setCurrentPickerTarget(target);
    setIsMediaPickerOpen(true);
  };

  const handleMediaSelect = (media: Media) => {
    if (!currentPickerTarget) return;

    if (currentPickerTarget === "primary") {
      setMainImage(media);
    } else if (currentPickerTarget === "secondary") {
      setSecondaryImage(media);
    } else if (typeof currentPickerTarget === "object" && currentPickerTarget.type === "slide") {
      const newSlideImages = [...slideImages];
      newSlideImages[currentPickerTarget.index] = media;
      setSlideImages(newSlideImages);
    }

    setIsMediaPickerOpen(false);
    setCurrentPickerTarget(null);
  };

  // Handle remove media
  const handleRemoveMainImage = () => setMainImage(null);
  const handleRemoveSecondaryImage = () => setSecondaryImage(null);
  const handleRemoveSlideImage = (index: number) => {
    const newSlideImages = [...slideImages];
    newSlideImages[index] = null;
    setSlideImages(newSlideImages);
  };

  // Handle add slide slot
  const handleAddSlideSlot = () => {
    if (slideImages.length < MAX_SLIDE_IMAGES) {
      setSlideImages([...slideImages, null]);
    }
  };

  // Handle attribute modal
  const handleOpenAttributeModal = (index?: number) => {
    if (index !== undefined) {
      // Edit mode
      const attribute = attributes[index];
      setEditingAttributeIndex(index);
      setAttributeFormData({
        name: attribute.name,
        value: attribute.value,
      });
    } else {
      // Add mode
      setEditingAttributeIndex(null);
      setAttributeFormData({
        name: "",
        value: "",
      });
    }
    setIsAttributeModalOpen(true);
  };

  const handleCloseAttributeModal = () => {
    setIsAttributeModalOpen(false);
    setEditingAttributeIndex(null);
    setAttributeFormData({
      name: "",
      value: "",
    });
  };

  const handleSaveAttribute = () => {
    if (!attributeFormData.name.trim() || !attributeFormData.value.trim()) {
      alert("Vui lòng nhập đầy đủ tên và giá trị thuộc tính");
      return;
    }

    // Check for duplicate attribute (same name + value)
    const isDuplicate = attributes.some((attribute, index) => {
      if (editingAttributeIndex !== null && index === editingAttributeIndex) {
        return false; // Skip the attribute being edited
      }
      return attribute.name === attributeFormData.name && attribute.value === attributeFormData.value;
    });

    if (isDuplicate) {
      alert("Thuộc tính với tên và giá trị này đã tồn tại");
      return;
    }

    if (editingAttributeIndex !== null) {
      // Update existing attribute
      const newAttributes = [...attributes];
      newAttributes[editingAttributeIndex] = {
        ...newAttributes[editingAttributeIndex],
        ...attributeFormData,
      };
      setAttributes(newAttributes);
    } else {
      // Add new attribute
      setAttributes([...attributes, attributeFormData]);
    }

    handleCloseAttributeModal();
  };

  const handleDeleteAttribute = (index: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa thuộc tính này?")) {
      const newAttributes = attributes.filter((_, i) => i !== index);
      setAttributes(newAttributes);
    }
  };

  // Handle variant modal
  const handleOpenVariantModal = (index?: number) => {
    if (index !== undefined) {
      // Edit mode
      const variant = variants[index];
      setEditingVariantIndex(index);
      setVariantFormData({
        sizeId: variant.sizeId,
        colorId: variant.colorId,
        isActive: variant.isActive,
        price: variant.price ?? 0,
      });
    } else {
      // Add mode
      setEditingVariantIndex(null);
      setVariantFormData({
        sizeId: "",
        colorId: "",
        isActive: true,
        price: 0,
      });
    }
    setIsVariantModalOpen(true);
  };

  const handleCloseVariantModal = () => {
    setIsVariantModalOpen(false);
    setEditingVariantIndex(null);
    setVariantFormData({
      sizeId: "",
      colorId: "",
      isActive: true,
      price: 0,
    });
  };

  const handleSaveVariant = () => {
    if (!variantFormData.sizeId || !variantFormData.colorId) {
      alert("Vui lòng chọn đầy đủ kích thước và màu sắc");
      return;
    }

    if (variantFormData.price < 0) {
      alert("Giá variant phải lớn hơn hoặc bằng 0");
      return;
    }

    // Check for duplicate variant (same sizeId + colorId)
    const isDuplicate = variants.some((variant, index) => {
      if (editingVariantIndex !== null && index === editingVariantIndex) {
        return false; // Skip the variant being edited
      }
      return variant.sizeId === variantFormData.sizeId && variant.colorId === variantFormData.colorId;
    });

    if (isDuplicate) {
      alert("Variant với kích thước và màu sắc này đã tồn tại");
      return;
    }

    if (editingVariantIndex !== null) {
      // Update existing variant
      const newVariants = [...variants];
      newVariants[editingVariantIndex] = {
        ...newVariants[editingVariantIndex],
        ...variantFormData,
      };
      setVariants(newVariants);
    } else {
      // Add new variant
      setVariants([...variants, variantFormData]);
    }

    handleCloseVariantModal();
  };

  const handleDeleteVariant = (index: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa variant này?")) {
      const newVariants = variants.filter((_, i) => i !== index);
      setVariants(newVariants);
    }
  };

  // Handle form submit
  const onFormSubmit = async (data: ProductFormValues) => {
    // Validate main image is required
    if (!mainImage) {
      alert("Vui lòng chọn ảnh chính");
      return;
    }

    // Build media items array
    // Map frontend categories to backend categories:
    // - main -> preview (ảnh chính)
    // - thumbnail -> detail_list (ảnh thumbnail cho list)
    // - slide -> detail (ảnh slide/detail)
    const mediaItems: { mediaId: string; mediaCategory: string }[] = [];
    
    // Add main image (preview)
    mediaItems.push({
      mediaId: mainImage.id,
      mediaCategory: MEDIA_CATEGORY.PRIMARY,
    });

    // Add thumbnail if exists (detail_list)
    if (secondaryImage) {
      mediaItems.push({
        mediaId: secondaryImage.id,
        mediaCategory: MEDIA_CATEGORY.SECONDARY,
      });
    }

    // Add slide images (detail)
    slideImages.forEach((slide) => {
      if (slide) {
        mediaItems.push({
          mediaId: slide.id,
          mediaCategory: MEDIA_CATEGORY.SLIDER,
        });
      }
    });

    // Build variants array from state
    const submitVariants = variants.map((v) => ({
      sizeId: v.sizeId,
      colorId: v.colorId,
      isActive: v.isActive,
      price: v.price,
    }));

    // Build attributes array from state
    const submitAttributes = attributes.length > 0 
      ? attributes.map((a) => ({
          name: a.name,
          value: a.value,
        }))
      : undefined;

    // Prepare submit data
    const submitData: {
      name: string;
      description?: string;
      isActive?: boolean;
      categoryId: string;
      discountId?: string | null;
      price: number;
      mediaItems: { mediaId: string; mediaCategory: string }[];
      variants: { sizeId: string; colorId: string; isActive: boolean; price: number }[];
      productAttributes?: { name: string; value: string }[];
    } = {
      name: data.name,
      description,
      isActive: data.isActive,
      categoryId: data.categoryId,
      discountId: data.discountId && data.discountId.trim() !== "" ? data.discountId : null,
      price: Number(data.price) || 0,
      mediaItems,
      variants: submitVariants,
      productAttributes: submitAttributes,
    };

    await onSubmit(submitData);
  };

  return (
    <>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6 py-4 dark:border-dark-3">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            {initialData ? "Cập nhật thông tin sản phẩm" : "Thông tin sản phẩm mới"}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-dark dark:text-white">
              Thông tin cơ bản
            </h3>

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
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Mô tả
              </label>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                disabled={isSubmitting}
                placeholder="Nhập mô tả sản phẩm..."
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

            {/* Khuyến mãi */}
            <div>
              <label
                htmlFor="discountId"
                className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
              >
                Khuyến mãi
              </label>
              <select
                id="discountId"
                {...register("discountId")}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
                disabled={isSubmitting || loadingDiscounts}
              >
                <option value="">
                  {loadingDiscounts ? "Đang tải..." : "-- Không chọn khuyến mãi --"}
                </option>
                {discounts.map((discount) => (
                  <option key={discount.id} value={discount.id}>
                    {discount.name} ({discount.discountType === "percentage" ? `${discount.discountValue}%` : `${discount.discountValue.toLocaleString("vi-VN")} VNĐ`})
                  </option>
                ))}
              </select>
              {errors.discountId && (
                <p className="mt-1 text-sm text-red">{errors.discountId.message}</p>
              )}
            </div>

            {/* Giá sản phẩm */}
            <div>
              <label
                htmlFor="price"
                className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
              >
                Giá sản phẩm (VNĐ)
                <span className="ml-1 select-none text-red">*</span>
                <span className="ml-1 text-dark-6 text-xs">(Chỉ để hiển thị)</span>
              </label>
              <input
                id="price"
                type="number"
                placeholder="Nhập giá sản phẩm"
                min="0"
                step="1"
                {...register("price", {
                  valueAsNumber: true,
                  setValueAs: (value) => (value === "" ? 0 : Number(value)),
                })}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
                disabled={isSubmitting}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red">{errors.price.message}</p>
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
          </div>

          {/* Media Section */}
          <div className="space-y-5 pt-6 border-t border-stroke dark:border-dark-3">
            <h3 className="text-lg font-semibold text-dark dark:text-white">
              Hình ảnh sản phẩm
            </h3>

            {/* Main and Thumbnail Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ImageSelector
                media={mainImage}
                onSelect={() => handleOpenMediaPicker("primary")}
                onRemove={handleRemoveMainImage}
                label="Ảnh chính"
                required
                disabled={isSubmitting}
              />

              <ImageSelector
                media={secondaryImage}
                onSelect={() => handleOpenMediaPicker("secondary")}
                onRemove={handleRemoveSecondaryImage}
                label="Ảnh phụ"
                disabled={isSubmitting}
              />
            </div>

            {/* Slide Images */}
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Ảnh slide (tối đa {MAX_SLIDE_IMAGES} ảnh)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {slideImages.map((slide, index) => (
                  <ImageSelector
                    key={index}
                    media={slide}
                    onSelect={() => handleOpenMediaPicker({ type: "slide", index })}
                    onRemove={() => handleRemoveSlideImage(index)}
                    disabled={isSubmitting}
                  />
                ))}

                {/* Add more button */}
                {slideImages.length < MAX_SLIDE_IMAGES && (
                  <button
                    type="button"
                    onClick={handleAddSlideSlot}
                    disabled={isSubmitting}
                    className="aspect-square rounded-lg border-2 border-dashed border-stroke dark:border-dark-3 hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 bg-gray-2 dark:bg-dark-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PlusIcon className="w-8 h-8 text-dark-6" />
                    <span className="text-sm text-dark-6">Thêm ảnh</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Product Attributes Management Section */}
          <div className="space-y-5 pt-6 border-t border-stroke dark:border-dark-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-dark dark:text-white">
                Thuộc tính sản phẩm
              </h3>
              <Button
                type="button"
                onClick={() => handleOpenAttributeModal()}
                disabled={isSubmitting}
                size="sm"
              >
                <PlusIcon className="w-4 h-4" />
                Thêm thuộc tính
              </Button>
            </div>

            {attributes.length === 0 ? (
              <div className="text-center py-8 text-dark-6 dark:text-gray-400">
                Chưa có thuộc tính nào. Nhấn &quot;Thêm thuộc tính&quot; để tạo thuộc tính đầu tiên.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-stroke dark:border-dark-3">
                      <th className="text-left py-3 px-4 text-body-sm font-medium text-dark dark:text-white">
                        Tên thuộc tính
                      </th>
                      <th className="text-left py-3 px-4 text-body-sm font-medium text-dark dark:text-white">
                        Giá trị
                      </th>
                      <th className="text-right py-3 px-4 text-body-sm font-medium text-dark dark:text-white">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributes.map((attribute, index) => (
                      <tr
                        key={index}
                        className="border-b border-stroke dark:border-dark-3 hover:bg-gray-2 dark:hover:bg-dark-2"
                      >
                        <td className="py-3 px-4 text-body-sm text-dark dark:text-white">
                          {attribute.name}
                        </td>
                        <td className="py-3 px-4 text-body-sm text-dark dark:text-white">
                          {attribute.value}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenAttributeModal(index)}
                              disabled={isSubmitting}
                            >
                              <EditIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAttribute(index)}
                              disabled={isSubmitting}
                              className="text-red hover:text-red dark:text-red-400 dark:hover:text-red-300"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Variants Management Section */}
          <div className="space-y-5 pt-6 border-t border-stroke dark:border-dark-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-dark dark:text-white">
                Quản lý Variants
              </h3>
              <Button
                type="button"
                onClick={() => handleOpenVariantModal()}
                disabled={isSubmitting || loadingSizes || loadingColors}
                size="sm"
              >
                <PlusIcon className="w-4 h-4" />
                Thêm variant
              </Button>
            </div>

            {variants.length === 0 ? (
              <div className="text-center py-8 text-dark-6 dark:text-gray-400">
                Chưa có variant nào. Nhấn &quot;Thêm variant&quot; để tạo variant đầu tiên.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-stroke dark:border-dark-3">
                      <th className="text-left py-3 px-4 text-body-sm font-medium text-dark dark:text-white">
                        Kích thước
                      </th>
                      <th className="text-left py-3 px-4 text-body-sm font-medium text-dark dark:text-white">
                        Màu sắc
                      </th>
                      <th className="text-left py-3 px-4 text-body-sm font-medium text-dark dark:text-white">
                        Giá (VNĐ)
                      </th>
                      <th className="text-left py-3 px-4 text-body-sm font-medium text-dark dark:text-white">
                        Trạng thái
                      </th>
                      <th className="text-right py-3 px-4 text-body-sm font-medium text-dark dark:text-white">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((variant, index) => {
                      const size = sizes.find((s) => s.id === variant.sizeId);
                      const color = colors.find((c) => c.id === variant.colorId);
                      return (
                        <tr
                          key={index}
                          className="border-b border-stroke dark:border-dark-3 hover:bg-gray-2 dark:hover:bg-dark-2"
                        >
                          <td className="py-3 px-4 text-body-sm text-dark dark:text-white">
                            {size ? size.name : "N/A"}
                          </td>
                          <td className="py-3 px-4">
                            {color ? (
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-5 h-5 rounded border border-stroke dark:border-dark-3"
                                  style={{ backgroundColor: color.colorCode }}
                                />
                                <span className="text-body-sm text-dark dark:text-white">
                                  {color.name} ({color.colorCode})
                                </span>
                              </div>
                            ) : (
                              <span className="text-body-sm text-dark dark:text-white">N/A</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-body-sm text-dark dark:text-white">
                            {variant.price.toLocaleString("vi-VN")}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                variant.isActive
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                              }`}
                            >
                              {variant.isActive ? "Kích hoạt" : "Vô hiệu"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenVariantModal(index)}
                                disabled={isSubmitting}
                              >
                                <EditIcon className="w-4 h-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteVariant(index)}
                                disabled={isSubmitting}
                                className="text-red hover:text-red dark:text-red-400 dark:hover:text-red-300"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-6 border-t border-stroke dark:border-dark-3">
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
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => {
          setIsMediaPickerOpen(false);
          setCurrentPickerTarget(null);
        }}
        onSelect={handleMediaSelect}
        mediaType="image"
      />

      {/* Attribute Modal */}
      <Dialog open={isAttributeModalOpen} onOpenChange={(open) => !open && handleCloseAttributeModal()}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-dark">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-dark dark:text-white">
              {editingAttributeIndex !== null ? "Sửa thuộc tính" : "Thêm thuộc tính mới"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Tên thuộc tính */}
            <div>
              <label
                htmlFor="attributeName"
                className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
              >
                Tên thuộc tính
                <span className="ml-1 select-none text-red">*</span>
              </label>
              <input
                id="attributeName"
                type="text"
                placeholder="Ví dụ: Chất liệu, Xuất xứ, Thương hiệu"
                required
                value={attributeFormData.name}
                onChange={(e) =>
                  setAttributeFormData({ ...attributeFormData, name: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
                disabled={isSubmitting}
              />
            </div>

            {/* Giá trị thuộc tính */}
            <div>
              <label
                htmlFor="attributeValue"
                className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
              >
                Giá trị thuộc tính
                <span className="ml-1 select-none text-red">*</span>
              </label>
              <input
                id="attributeValue"
                type="text"
                placeholder="Ví dụ: Vải cotton, Việt Nam, Crexy"
                required
                value={attributeFormData.value}
                onChange={(e) =>
                  setAttributeFormData({ ...attributeFormData, value: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseAttributeModal}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type="button" onClick={handleSaveAttribute} disabled={isSubmitting}>
              {editingAttributeIndex !== null ? "Cập nhật" : "Tạo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Variant Modal */}
      <Dialog open={isVariantModalOpen} onOpenChange={(open) => !open && handleCloseVariantModal()}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-dark">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-dark dark:text-white">
              {editingVariantIndex !== null ? "Sửa variant" : "Thêm variant mới"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Kích thước */}
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Kích thước <span className="ml-1 select-none text-red">*</span>
              </label>
              {loadingSizes ? (
                <div className="text-sm text-dark-6">Đang tải...</div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {sizes.map((size) => (
                    <label
                      key={size.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-stroke dark:border-dark-3 hover:bg-gray-2 dark:hover:bg-dark-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="sizeId"
                        value={size.id}
                        checked={variantFormData.sizeId === size.id}
                        onChange={(e) =>
                          setVariantFormData({ ...variantFormData, sizeId: e.target.value })
                        }
                        className="w-4 h-4 text-primary border-stroke focus:ring-primary"
                        disabled={isSubmitting}
                      />
                      <span className="text-body-sm text-dark dark:text-white">{size.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Màu sắc */}
            <div>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Màu sắc <span className="ml-1 select-none text-red">*</span>
              </label>
              {loadingColors ? (
                <div className="text-sm text-dark-6">Đang tải...</div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {colors.map((color) => (
                    <label
                      key={color.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-stroke dark:border-dark-3 hover:bg-gray-2 dark:hover:bg-dark-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="colorId"
                        value={color.id}
                        checked={variantFormData.colorId === color.id}
                        onChange={(e) =>
                          setVariantFormData({ ...variantFormData, colorId: e.target.value })
                        }
                        className="w-4 h-4 text-primary border-stroke focus:ring-primary"
                        disabled={isSubmitting}
                      />
                      <div
                        className="w-6 h-6 rounded border border-stroke dark:border-dark-3"
                        style={{ backgroundColor: color.colorCode }}
                      />
                      <span className="text-body-sm text-dark dark:text-white">
                        {color.name} ({color.colorCode})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Giá variant */}
            <div>
              <label
                htmlFor="variantPrice"
                className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
              >
                Giá variant (VNĐ)
                <span className="ml-1 select-none text-red">*</span>
                <span className="ml-1 text-dark-6 text-xs">(Giá để tính tiền)</span>
              </label>
              <input
                id="variantPrice"
                type="number"
                placeholder="Nhập giá variant"
                min="0"
                step="1"
                required
                value={variantFormData.price ?? 0}
                onChange={(e) =>
                  setVariantFormData({
                    ...variantFormData,
                    price: e.target.value === "" ? 0 : Number(e.target.value),
                  })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
                disabled={isSubmitting}
              />
            </div>

            {/* Trạng thái */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={variantFormData.isActive}
                  onChange={(e) =>
                    setVariantFormData({ ...variantFormData, isActive: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-stroke bg-transparent text-primary focus:ring-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2"
                  disabled={isSubmitting}
                />
                <span className="text-body-sm font-medium text-dark dark:text-white">
                  Kích hoạt variant
                </span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseVariantModal}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type="button" onClick={handleSaveVariant} disabled={isSubmitting}>
              {editingVariantIndex !== null ? "Cập nhật" : "Tạo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

