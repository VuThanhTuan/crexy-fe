"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { productsService } from "@/services/admin/products.service";
import type { Product, PaginatedProductResponse } from "@/types/product";
import type { AxiosError } from "axios";
import { CheckIcon } from "lucide-react";

interface ProductSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
  excludedProductIds?: string[]; // Sản phẩm đã có trong collection
}

export function ProductSelectModal({
  isOpen,
  onClose,
  onSelect,
  excludedProductIds = [],
}: ProductSelectModalProps) {
  const [data, setData] = useState<PaginatedProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchData = useCallback(async (page = currentPage, limit = pageSize, search = searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productsService.getAll({
        page,
        limit,
        search: search || undefined,
      });
      setData(response);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(axiosErr.response?.data?.message || "Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchQuery]);

  useEffect(() => {
    if (isOpen) {
      fetchData(currentPage, pageSize, searchQuery);
    }
  }, [isOpen, currentPage, searchQuery]);

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
      setSearchQuery("");
      setSelectedProductId(null);
    }
  }, [isOpen]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProductId(product.id);
  };

  const handleAdd = () => {
    if (selectedProductId && data) {
      const selectedProduct = data.data.find((p) => p.id === selectedProductId);
      if (selectedProduct) {
        onSelect(selectedProduct);
        onClose();
      }
    }
  };

  const filteredProducts = data?.data.filter(
    (product) => !excludedProductIds.includes(product.id)
  ) || [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] bg-white dark:bg-gray-dark max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-dark dark:text-white">
            Chọn sản phẩm
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setCurrentPage(1);
                }
              }}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Table */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-10">
                <p className="text-dark-6">Đang tải dữ liệu...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center py-10">
                <p className="text-red">{error}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex justify-center py-10">
                <p className="text-dark-6">Không tìm thấy sản phẩm</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="min-w-[80px]">Ảnh</TableHead>
                    <TableHead className="min-w-[200px]">Tên sản phẩm</TableHead>
                    <TableHead className="min-w-[150px]">Giá</TableHead>
                    <TableHead className="min-w-[150px]">Danh mục</TableHead>
                    <TableHead className="min-w-[100px]">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow
                      key={product.id}
                      className={`border-[#eee] dark:border-dark-3 cursor-pointer ${
                        selectedProductId === product.id
                          ? "bg-primary/10 dark:bg-primary/20"
                          : "hover:bg-gray-2 dark:hover:bg-dark-2"
                      }`}
                      onClick={() => handleSelectProduct(product)}
                    >
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedProductId === product.id
                                ? "border-primary bg-primary"
                                : "border-stroke dark:border-dark-3"
                            }`}
                          >
                            {selectedProductId === product.id && (
                              <CheckIcon className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.primaryImage?.url ? (
                          <div className="flex items-center justify-center">
                            <img
                              src={product.primaryImage.url}
                              alt={product.primaryImage.originName || product.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-100 dark:bg-dark-2">
                            <span className="text-xs text-dark-6 dark:text-dark-6">
                              No image
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-dark dark:text-white">
                          {product.name}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-dark dark:text-white">
                          {product.price ? product.price.toLocaleString("vi-VN") : "-"} VNĐ
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-dark-6 dark:text-dark-6">
                          {product.category?.name || "-"}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                            product.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {product.isActive ? "Hoạt động" : "Tạm dừng"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-stroke dark:border-dark-3">
              <div className="text-sm text-dark-6">
                Hiển thị {(currentPage - 1) * pageSize + 1} -{" "}
                {Math.min(currentPage * pageSize, data.total)} trong tổng số{" "}
                {data.total} bản ghi
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Trước
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === data.totalPages ||
                        Math.abs(page - currentPage) <= 1
                      );
                    })
                    .map((page, index, array) => {
                      const showEllipsisBefore =
                        index > 0 && array[index - 1] !== page - 1;
                      return (
                        <div key={page} className="flex items-center">
                          {showEllipsisBefore && (
                            <span className="px-2 text-dark-6">...</span>
                          )}
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
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
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(data.totalPages, prev + 1))
                  }
                  disabled={currentPage === data.totalPages}
                >
                  Sau
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleAdd} disabled={!selectedProductId}>
            Thêm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
