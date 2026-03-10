"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { productsService } from "@/services/admin/products.service";
import type { Product } from "@/types/product";
import type { AxiosError } from "axios";

interface ProductFormPageProps {
  initialData?: Product;
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
      price: number;
    }[];
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ProductFormPage = dynamic<ProductFormPageProps>(
  () => import("../../_components/product-form-page"),
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

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productsService.getOne(resolvedParams.id);
        setProduct(data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        alert(axiosErr.response?.data?.message || "Không thể tải dữ liệu sản phẩm");
        router.push("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [resolvedParams.id, router]);

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
      price: number;
    }[];
  }) => {
    setIsSubmitting(true);
    try {
      await productsService.update(resolvedParams.id, formData);
      
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

  if (loading) {
    return (
      <>
        <Breadcrumb pageName="Cập nhật sản phẩm" />
        <div className="flex justify-center py-20">
          <p className="text-dark-6">Đang tải dữ liệu...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <>
      <Breadcrumb pageName={`Cập nhật: ${product.name}`} />

      <ProductFormPage
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

