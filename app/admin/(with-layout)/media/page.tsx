"use client";

import { useEffect, useState, useCallback } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Button } from "@/components/ui/button";
import { mediaService } from "@/services/admin/media.service";
import type { Media, PaginatedMediaResponse } from "@/types/media";
import { MediaCard } from "./_components/media-card";
import { MediaUploadModal } from "./_components/media-upload-modal";
import { MediaEditModal } from "./_components/media-edit-modal";
import { DeleteConfirmationDialog } from "./_components/delete-confirmation-dialog";
import type { AxiosError } from "axios";
import { SearchIcon, UploadIcon, FilterIcon } from "lucide-react";

export default function MediaPage() {
  const [data, setData] = useState<PaginatedMediaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [mediaToDelete, setMediaToDelete] = useState<Media | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [mediaTypeFilter, setMediaTypeFilter] = useState<"all" | "image" | "video">("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Grid layout works well with multiples of 3 or 4

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await mediaService.getAll({
        page: currentPage,
        limit: pageSize,
        search: searchQuery || undefined,
        mediaType: mediaTypeFilter === "all" ? undefined : mediaTypeFilter,
        sortBy: "createdAt",
        sortOrder: "DESC",
      });
      setData(response);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(axiosErr.response?.data?.message || "Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchQuery, mediaTypeFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle upload
  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      await mediaService.upload(file);
      setIsUploadModalOpen(false);
      await fetchData();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "Có lỗi xảy ra khi upload");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle edit
  const handleEdit = (media: Media) => {
    setSelectedMedia(media);
    setIsEditModalOpen(true);
  };

  // Handle edit submit
  const handleEditSubmit = async (formData: { originName: string }) => {
    if (!selectedMedia) return;

    setIsSubmitting(true);
    try {
      await mediaService.update(selectedMedia.id, formData);
      setIsEditModalOpen(false);
      setSelectedMedia(null);
      await fetchData();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete click
  const handleDeleteClick = (media: Media) => {
    setMediaToDelete(media);
    setIsDeleteDialogOpen(true);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!mediaToDelete) return;

    setIsDeleting(true);
    try {
      await mediaService.delete(mediaToDelete.id);
      setIsDeleteDialogOpen(false);
      setMediaToDelete(null);
      await fetchData();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "Không thể xóa media");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle filter change
  const handleMediaTypeFilterChange = (type: "all" | "image" | "video") => {
    setMediaTypeFilter(type);
    setCurrentPage(1); // Reset to first page when filtering
  };

  return (
    <>
      <Breadcrumb pageName="Quản lý Media" />

      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="border-b border-stroke px-6 py-4 dark:border-dark-3 sm:px-7.5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-dark dark:text-white">
              Thư viện Media
            </h2>
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <UploadIcon className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên file..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2.5 pl-10 pr-4 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-6" />
              </div>
            </form>

            {/* Filter by type */}
            <div className="flex items-center gap-2">
              <FilterIcon className="w-5 h-5 text-dark-6" />
              <select
                value={mediaTypeFilter}
                onChange={(e) => handleMediaTypeFilterChange(e.target.value as "all" | "image" | "video")}
                className="rounded-lg border-[1.5px] border-stroke bg-transparent py-2.5 px-4 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              >
                <option value="all">Tất cả</option>
                <option value="image">Ảnh</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-7.5">
          {loading ? (
            <div className="flex justify-center py-20">
              <p className="text-dark-6">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center py-20">
              <p className="text-red">{error}</p>
            </div>
          ) : !data || data.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-dark-6 mb-4">
                {searchQuery || mediaTypeFilter !== "all"
                  ? "Không tìm thấy media nào"
                  : "Chưa có media nào"}
              </p>
              {!searchQuery && mediaTypeFilter === "all" && (
                <Button onClick={() => setIsUploadModalOpen(true)}>
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Upload Media đầu tiên
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {data.data.map((media) => (
                  <MediaCard
                    key={media.id}
                    media={media}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 border-t border-stroke dark:border-dark-3">
                  <div className="text-sm text-dark-6">
                    Hiển thị {(currentPage - 1) * pageSize + 1} -{" "}
                    {Math.min(currentPage * pageSize, data.total)} trong tổng số{" "}
                    {data.total} file
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
      <MediaUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        isUploading={isUploading}
      />

      {selectedMedia && (
        <MediaEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedMedia(null);
          }}
          onSubmit={handleEditSubmit}
          media={selectedMedia}
          isSubmitting={isSubmitting}
        />
      )}

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={mediaToDelete?.originName || ""}
        isDeleting={isDeleting}
      />
    </>
  );
}
