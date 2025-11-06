"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { collectionsService } from "@/services/admin/collections.service";
import type { Collection, PaginatedCollectionResponse } from "@/types/collection";
import { DeleteConfirmationDialog } from "./_components/delete-confirmation-dialog";
import type { AxiosError } from "axios";
import { PencilIcon, TrashIcon } from "lucide-react";

// Format date helper
const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

export default function CollectionsPage() {
  const router = useRouter();
  const [data, setData] = useState<PaginatedCollectionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<Collection | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch data
  const fetchData = useCallback(async (page = currentPage, limit = pageSize) => {
    setLoading(true);
    setError(null);
    try {
      const response = await collectionsService.getAll({
        page,
        limit,
      });
      setData(response);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(axiosErr.response?.data?.message || "Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle create
  const handleCreate = () => {
    router.push("/admin/collections/create");
  };

  // Handle edit
  const handleEdit = (collection: Collection) => {
    router.push(`/admin/collections/${collection.id}/edit`);
  };

  // Handle delete click
  const handleDeleteClick = (collection: Collection) => {
    setCollectionToDelete(collection);
    setIsDeleteDialogOpen(true);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!collectionToDelete) return;
    setIsDeleting(true);
    try {
      await collectionsService.delete(collectionToDelete.id);
      setIsDeleteDialogOpen(false);
      setCollectionToDelete(null);
      await fetchData();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Quản lý bộ sưu tập" />

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stroke px-6 py-4 dark:border-dark-3 sm:px-7.5">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Danh sách bộ sưu tập
          </h2>
          <Button onClick={handleCreate}>Thêm bộ sưu tập mới</Button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-7.5">
          {loading ? (
            <div className="flex justify-center py-10">
              <p className="text-dark-6">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center py-10">
              <p className="text-red">{error}</p>
            </div>
          ) : !data || data.data.length === 0 ? (
            <div className="flex justify-center py-10">
              <p className="text-dark-6">Chưa có dữ liệu</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
                    <TableHead className="min-w-[150px]">Hình đại diện</TableHead>
                    <TableHead className="min-w-[200px]">Tên bộ sưu tập</TableHead>
                    <TableHead className="min-w-[150px]">Số sản phẩm</TableHead>
                    <TableHead className="min-w-[150px]">Ngày tạo</TableHead>
                    <TableHead className="min-w-[150px]">Ngày cập nhật</TableHead>
                    <TableHead className="text-right min-w-[120px]">
                      Thao tác
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.data.map((collection) => (
                    <TableRow
                      key={collection.id}
                      className="border-[#eee] dark:border-dark-3"
                    >
                      <TableCell>
                        {collection.media ? (
                          <img
                            src={collection.media.url}
                            alt={collection.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-lg bg-gray-2 dark:bg-dark-2 flex items-center justify-center">
                            <span className="text-dark-6 text-xs">Không có</span>
                          </div>
                        )}
                      </TableCell>

                      <TableCell>
                        <p className="font-medium text-dark dark:text-white">
                          {collection.name}
                        </p>
                        {collection.description && (
                          <p className="text-sm text-dark-6 dark:text-dark-6 mt-1 line-clamp-2">
                            {collection.description}
                          </p>
                        )}
                      </TableCell>

                      <TableCell>
                        <p className="text-dark dark:text-white">
                          {collection.productCount}
                        </p>
                      </TableCell>

                      <TableCell>
                        <p className="text-dark dark:text-white">
                          {formatDate(collection.createdAt)}
                        </p>
                      </TableCell>

                      <TableCell>
                        <p className="text-dark dark:text-white">
                          {formatDate(collection.updatedAt)}
                        </p>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center justify-end gap-x-3.5">
                          <button
                            onClick={() => handleEdit(collection)}
                            className="hover:text-primary transition-colors"
                            title="Chỉnh sửa"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => handleDeleteClick(collection)}
                            className="hover:text-red transition-colors"
                            title="Xóa"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-stroke dark:border-dark-3">
                  <div className="text-sm text-dark-6">
                    Hiển thị {(currentPage - 1) * pageSize + 1} -{" "}
                    {Math.min(currentPage * pageSize, data.total)} trong tổng số{" "}
                    {data.total} bản ghi
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Trước
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                          // Show first page, last page, current page, and pages around current
                          return (
                            page === 1 ||
                            page === data.totalPages ||
                            Math.abs(page - currentPage) <= 1
                          );
                        })
                        .map((page, index, array) => {
                          // Add ellipsis if there's a gap
                          const showEllipsisBefore =
                            index > 0 && array[index - 1] !== page - 1;

                          return (
                            <div key={page} className="flex items-center">
                              {showEllipsisBefore && (
                                <span className="px-2 text-dark-6">...</span>
                              )}
                              <Button
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                onClick={() => setCurrentPage(page)}
                                className="min-w-[40px]"
                              >
                                {page}
                              </Button>
                            </div>
                          );
                        })}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(data.totalPages, prev + 1)
                        )
                      }
                      disabled={currentPage === data.totalPages}
                    >
                      Sau
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={collectionToDelete?.name || ""}
        isDeleting={isDeleting}
      />
    </>
  );
}
