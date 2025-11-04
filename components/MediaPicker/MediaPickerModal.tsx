"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mediaService } from "@/services/admin/media.service";
import type { Media, PaginatedMediaResponse } from "@/types/media";
import type { AxiosError } from "axios";
import { SearchIcon, UploadIcon, CheckIcon, ImageIcon, VideoIcon, FileIcon } from "lucide-react";
import { MediaUploadModal } from "@/app/admin/(with-layout)/media/_components/media-upload-modal";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
  selectedMediaId?: string;
  mediaType?: "image" | "video" | "all";
}

export function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  selectedMediaId,
  mediaType = "all",
}: MediaPickerModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<PaginatedMediaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const pageSize = 12;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await mediaService.getAll({
        page: currentPage,
        limit: pageSize,
        search: searchQuery || undefined,
        mediaType: mediaType === "all" ? undefined : mediaType,
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
  }, [currentPage, searchQuery, mediaType]);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, fetchData]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  // Handle upload
  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const result = await mediaService.upload(file);
      setIsUploadModalOpen(false);
      await fetchData();
      // Auto select the newly uploaded media
      if (result.data) {
        setSelectedMedia(result.data);
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      alert(axiosErr.response?.data?.message || "Có lỗi xảy ra khi upload");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle select
  const handleSelectMedia = (media: Media) => {
    setSelectedMedia(media);
  };

  // Handle confirm
  const handleConfirm = () => {
    if (selectedMedia) {
      onSelect(selectedMedia);
      onClose();
      setSelectedMedia(null);
      setSearchInput("");
      setSearchQuery("");
      setCurrentPage(1);
    }
  };

  // Handle close
  const handleClose = () => {
    onClose();
    setSelectedMedia(null);
    setSearchInput("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col bg-white dark:bg-gray-dark">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-dark dark:text-white">
              Chọn ảnh từ thư viện
            </DialogTitle>
          </DialogHeader>

          {/* Search and Upload */}
          <div className="flex gap-3 items-center">
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

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
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
                  {searchQuery ? "Không tìm thấy media nào" : "Chưa có media nào"}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setIsUploadModalOpen(true)}>
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Upload Media đầu tiên
                  </Button>
                )}
              </div>
            ) : (
              <>
                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                  {data.data.map((media) => (
                    <div
                      key={media.id}
                      onClick={() => handleSelectMedia(media)}
                      className={`relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                        selectedMedia?.id === media.id || selectedMediaId === media.id
                          ? "border-primary shadow-lg"
                          : "border-stroke dark:border-dark-3"
                      }`}
                    >
                      {/* Media Preview */}
                      <div className="aspect-square bg-gray-2 dark:bg-dark-2 relative overflow-hidden">
                        {media.mediaType === 'image' ? (
                          <img
                            src={media.url}
                            alt={media.originName}
                            className="w-full h-full object-cover"
                          />
                        ) : media.mediaType === 'video' ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <VideoIcon className="w-12 h-12 text-dark-6" />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileIcon className="w-12 h-12 text-dark-6" />
                          </div>
                        )}

                        {/* Selected indicator */}
                        {(selectedMedia?.id === media.id || selectedMediaId === media.id) && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                              <CheckIcon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        )}

                        {/* Media type badge */}
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-white/90 dark:bg-gray-dark/90 text-dark dark:text-white">
                            {media.mediaType === 'image' ? (
                              <ImageIcon className="w-3 h-3" />
                            ) : (
                              <VideoIcon className="w-3 h-3" />
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Media Info */}
                      <div className="p-2 bg-white dark:bg-gray-dark">
                        <p className="text-xs text-dark dark:text-white truncate" title={media.originName}>
                          {media.originName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4 border-t border-stroke dark:border-dark-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Trước
                    </Button>

                    <span className="text-sm text-dark-6">
                      Trang {currentPage} / {data.totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(data.totalPages, prev + 1))
                      }
                      disabled={currentPage === data.totalPages}
                    >
                      Sau
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-stroke dark:border-dark-3">
            <Button type="button" variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="button" onClick={handleConfirm} disabled={!selectedMedia}>
              Chọn
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Modal */}
      <MediaUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        isUploading={isUploading}
      />
    </>
  );
}

