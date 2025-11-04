"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { productsService } from "@/services/admin/products.service";
import type { AxiosError } from "axios";

interface ProductFormPageProps {
  initialData?: undefined;
  onSubmit: (formData: {
    name: string;
    description?: string;
    isActive?: boolean;
    categoryId: string;
    discountId?: string | null;
    mediaItems: {
      mediaId: string;
      mediaCategory: string;
    }[];
    variants: {
      sizeId: string;
      colorId: string;
      isActive: boolean;
    }[];
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ProductFormPage = dynamic<ProductFormPageProps>(
  () => import("../_components/product-form-page"),
  { 
    ssr: false,
    loading: () => (
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex justify-center py-20">
          <p className="text-dark-6">Đang tải form...</p>
        </div>
      </div>
    )
  }
);

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: {
    name: string;
    description?: string;
    isActive?: boolean;
    categoryId: string;
    discountId?: string | null;
    mediaItems: {
      mediaId: string;
      mediaCategory: string;
    }[];
    variants: {
      sizeId: string;
      colorId: string;
      isActive: boolean;
    }[];
  }) => {
    setIsSubmitting(true);
    try {
      await productsService.create(formData);
      
      // Redirect to products list
      router.push("/admin/products");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/products");
  };

  return (
    <>
      <Breadcrumb pageName="Tạo sản phẩm mới" />

      <ProductFormPage
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

