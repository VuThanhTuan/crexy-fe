"use client";

import { useEffect, useState, useCallback } from "react";
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
import { categoriesService } from "@/services/admin/categories.service";
import type { Category, PaginatedCategoryResponse } from "@/types/category";
import { CategoryModal } from "./_components/category-modal";
import type { CategoryFormValues } from "./_components/category-form";
import { DeleteConfirmationDialog } from "./_components/delete-confirmation-dialog";
import type { AxiosError } from "axios";
import { PencilIcon, TrashIcon, SearchIcon, XIcon, FolderTree } from "lucide-react";

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

export default function CategoryPage() {
  const [data, setData] = useState<PaginatedCategoryResponse | null>(null);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination and filter states
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedParentId, setSelectedParentId] = useState("");
  const pageSize = 10;

  // Fetch all categories for parent selection
  const fetchAllCategories = useCallback(async () => {
    try {
      const response = await categoriesService.getAll({ limit: 1000 });
      setAllCategories(response.data);
    } catch (err) {
      console.error("Error loading all categories:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  // Fetch data
  const fetchData = useCallback(
    async (page = currentPage, limit = pageSize) => {
      setLoading(true);
      setError(null);
      try {
        const response = await categoriesService.getAll({
          page,
          limit,
          search: searchTerm || undefined,
          parentId: selectedParentId || undefined,
        });
        setData(response);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        setError(axiosErr.response?.data?.message || "Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, pageSize, searchTerm, selectedParentId]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle search
  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle parent filter
  const handleParentChange = (parentId: string) => {
    setSelectedParentId(parentId);
    setCurrentPage(1);
  };

  // Handle create
  const handleCreate = () => {
    setSelectedCategory(undefined);
    setIsModalOpen(true);
  };

  // Handle edit
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  // Handle form submit
  const handleFormSubmit = async (formData: CategoryFormValues) => {
    setIsSubmitting(true);
    try {
      if (selectedCategory) {
        // Update
        await categoriesService.update(selectedCategory.id, formData);
      } else {
        // Create
        await categoriesService.create(formData);
      }
      setIsModalOpen(false);
      await Promise.all([fetchData(), fetchAllCategories()]);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    try {
      await categoriesService.delete(categoryToDelete.id);
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
      await Promise.all([fetchData(), fetchAllCategories()]);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "Không thể xóa danh mục");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Quản lý danh mục" />

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="border-b border-stroke px-6 py-4 dark:border-dark-3 sm:px-7.5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Danh sách danh mục
            </h2>
            <Button onClick={handleCreate}>Thêm danh mục mới</Button>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
            {/* Search */}
            <div className="flex-1">
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-dark dark:text-white"
              >
                Tìm kiếm
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Tìm kiếm theo tên danh mục..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 pr-10 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-6 hover:text-dark dark:text-dark-6 dark:hover:text-white"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Parent Filter */}
            <div className="w-full sm:w-64">
              <label
                htmlFor="parent"
                className="mb-2 block text-sm font-medium text-dark dark:text-white"
              >
                Danh mục cha
              </label>
              <select
                id="parent"
                value={selectedParentId}
                onChange={(e) => handleParentChange(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              >
                <option value="">Tất cả danh mục</option>
                {allCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div>
              <Button onClick={handleSearch} className="w-full sm:w-auto">
                <SearchIcon className="mr-2 h-4 w-4" />
                Tìm kiếm
              </Button>
            </div>
          </div>
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
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
                      <TableHead className="min-w-[200px]">Tên danh mục</TableHead>
                      <TableHead className="min-w-[150px]">Slug</TableHead>
                      <TableHead className="min-w-[150px]">Danh mục cha</TableHead>
                      <TableHead className="min-w-[100px]">Sản phẩm</TableHead>
                      <TableHead className="min-w-[100px]">Danh mục con</TableHead>
                      <TableHead className="min-w-[150px]">Ngày tạo</TableHead>
                      <TableHead className="text-right min-w-[120px]">
                        Thao tác
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {data.data.map((category) => (
                      <TableRow
                        key={category.id}
                        className="border-[#eee] dark:border-dark-3"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {category.childrens && category.childrens.length > 0 && (
                              <FolderTree className="h-4 w-4 text-primary" />
                            )}
                            <div>
                              <p className="font-medium text-dark dark:text-white">
                                {category.name}
                              </p>
                              {category.description && (
                                <p className="text-sm text-dark-6 dark:text-dark-6 line-clamp-2 mt-1">
                                  {category.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <p className="text-dark dark:text-white">
                            {category.slug || "-"}
                          </p>
                        </TableCell>

                        <TableCell>
                          <p className="text-dark dark:text-white">
                            {category.parent?.name || "-"}
                          </p>
                        </TableCell>

                        <TableCell>
                          <p className="text-dark dark:text-white">
                            {/* TODO: productCount from API response */}
                            0
                          </p>
                        </TableCell>

                        <TableCell>
                          <p className="text-dark dark:text-white">
                            {category.childrens?.length || 0}
                          </p>
                        </TableCell>

                        <TableCell>
                          <p className="text-dark dark:text-white">
                            {formatDate(category.createdAt)}
                          </p>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center justify-end gap-x-3.5">
                            <button
                              onClick={() => handleEdit(category)}
                              className="hover:text-primary transition-colors"
                              title="Chỉnh sửa"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() => handleDeleteClick(category)}
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
              </div>

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
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedCategory}
        categories={allCategories}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={categoryToDelete?.name || ""}
        isDeleting={isDeleting}
      />
    </>
  );
}

