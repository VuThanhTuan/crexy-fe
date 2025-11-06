"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CollectionFormPage } from "../../_components/collection-form-page";
import { collectionsService } from "@/services/admin/collections.service";
import type { Collection } from "@/types/collection";
import type { AxiosError } from "axios";

export default function EditCollectionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadCollection = async () => {
      try {
        setLoading(true);
        const data = await collectionsService.getOne(id);
        setCollection(data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        setError(axiosErr.response?.data?.message || "Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCollection();
    }
  }, [id]);

  const handleSubmit = async (data: {
    name: string;
    description?: string;
    slug?: string;
    mediaId?: string;
    productIds?: string[];
  }) => {
    setIsSubmitting(true);
    try {
      await collectionsService.update(id, data);
      router.push("/admin/collections");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Breadcrumb pageName="Chỉnh sửa bộ sưu tập" />
        <div className="flex justify-center py-10">
          <p className="text-dark-6">Đang tải dữ liệu...</p>
        </div>
      </>
    );
  }

  if (error || !collection) {
    return (
      <>
        <Breadcrumb pageName="Chỉnh sửa bộ sưu tập" />
        <div className="flex justify-center py-10">
          <p className="text-red">{error || "Không tìm thấy bộ sưu tập"}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Chỉnh sửa bộ sưu tập" />
      <CollectionFormPage
        initialData={collection}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
