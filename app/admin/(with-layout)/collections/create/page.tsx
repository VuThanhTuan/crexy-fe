"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CollectionFormPage } from "../_components/collection-form-page";
import { collectionsService } from "@/services/admin/collections.service";
import type { AxiosError } from "axios";

export default function CreateCollectionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    name: string;
    description?: string;
    slug?: string;
    mediaId?: string;
    productIds?: string[];
  }) => {
    setIsSubmitting(true);
    try {
      await collectionsService.create(data);
      router.push("/admin/collections");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Tạo bộ sưu tập mới" />
      <CollectionFormPage onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </>
  );
}
