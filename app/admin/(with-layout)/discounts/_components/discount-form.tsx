"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import type { Discount } from "@/types/discount";
import { useEffect } from "react";

const discountSchema = z
  .object({
    name: z
      .string()
      .min(1, "Tên mã giảm giá không được để trống")
      .max(255, "Tên mã giảm giá không được vượt quá 255 ký tự"),
    value: z.string().optional(),
    discountType: z.enum(["percentage", "fixed"], {
      message: "Vui lòng chọn loại giảm giá",
    }),
    discountValue: z
      .number({ message: "Giá trị giảm giá phải là số" })
      .int("Giá trị giảm giá phải là số nguyên")
      .min(0, "Giá trị giảm giá phải lớn hơn hoặc bằng 0"),
  })
  .refine(
    (data) => {
      if (data.discountType === "percentage") {
        return data.discountValue <= 100;
      }
      return true;
    },
    {
      message: "Giá trị giảm giá theo phần trăm không được vượt quá 100",
      path: ["discountValue"],
    }
  );

type DiscountFormValues = z.infer<typeof discountSchema>;

interface DiscountFormProps {
  initialData?: Discount;
  onSubmit: (data: DiscountFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function DiscountForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: DiscountFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      name: initialData?.name || "",
      value: initialData?.value || "",
      discountType: initialData?.discountType || "percentage",
      discountValue: initialData?.discountValue || 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        value: initialData.value || "",
        discountType: initialData.discountType,
        discountValue: initialData.discountValue,
      });
    }
  }, [initialData, reset]);

  const discountType = watch("discountType");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Tên mã giảm giá
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nhập tên mã giảm giá (VD: Giảm 20% cho khách hàng mới)"
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
          htmlFor="value"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Giá trị giảm giá (text)
        </label>
        <input
          id="value"
          type="text"
          placeholder="Nhập giá trị giảm giá (VD: Giảm 20%)"
          {...register("value")}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          disabled={isSubmitting}
        />
        {errors.value && (
          <p className="mt-1 text-sm text-red">{errors.value.message}</p>
        )}
        <p className="mt-1 text-xs text-dark-6">
          Mô tả hiển thị của mã giảm giá (không bắt buộc)
        </p>
      </div>

      <div>
        <label
          htmlFor="discountType"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Loại giảm giá
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <select
          id="discountType"
          {...register("discountType")}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          disabled={isSubmitting}
        >
          <option value="percentage">Giảm theo phần trăm (%)</option>
          <option value="fixed">Giảm theo số tiền trực tiếp</option>
        </select>
        {errors.discountType && (
          <p className="mt-1 text-sm text-red">{errors.discountType.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="discountValue"
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          Giá trị giảm giá
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <div className="relative">
          <input
            id="discountValue"
            type="number"
            placeholder={
              discountType === "percentage" ? "Nhập phần trăm (0-100)" : "Nhập số tiền"
            }
            {...register("discountValue", { valueAsNumber: true })}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
            disabled={isSubmitting}
            min={0}
            max={discountType === "percentage" ? 100 : undefined}
            step="1"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-6">
            {discountType === "percentage" ? "%" : "VNĐ"}
          </span>
        </div>
        {errors.discountValue && (
          <p className="mt-1 text-sm text-red">{errors.discountValue.message}</p>
        )}
        <p className="mt-1 text-xs text-dark-6">
          {discountType === "percentage"
            ? "Nhập số nguyên từ 0 đến 100 (ví dụ: 20)"
            : "Nhập số nguyên là số tiền giảm (ví dụ: 100000)"}
        </p>
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

