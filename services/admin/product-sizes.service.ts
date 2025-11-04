import { getAdminApi } from "@/common/axios";
import type {
  ProductSize,
  CreateProductSizeDto,
  UpdateProductSizeDto,
  ProductSizeQueryDto,
  PaginatedProductSizeResponse,
} from "@/types/product-size";

const API_PREFIX = "/admin/product-sizes";

export const productSizesService = {
  /**
   * Lấy danh sách kích thước sản phẩm
   */
  async getAll(query?: ProductSizeQueryDto): Promise<PaginatedProductSizeResponse> {
    const api = getAdminApi();
    const response = await api.get<PaginatedProductSizeResponse>(API_PREFIX, {
      params: query,
    });
    return response.data;
  },

  /**
   * Lấy chi tiết một kích thước
   */
  async getOne(id: string): Promise<ProductSize> {
    const api = getAdminApi();
    const response = await api.get<ProductSize>(`${API_PREFIX}/${id}`);
    return response.data;
  },

  /**
   * Tạo kích thước mới
   */
  async create(data: CreateProductSizeDto): Promise<ProductSize> {
    const api = getAdminApi();
    const response = await api.post<ProductSize>(API_PREFIX, data);
    return response.data;
  },

  /**
   * Cập nhật kích thước
   */
  async update(id: string, data: UpdateProductSizeDto): Promise<ProductSize> {
    const api = getAdminApi();
    const response = await api.patch<ProductSize>(`${API_PREFIX}/${id}`, data);
    return response.data;
  },

  /**
   * Xóa kích thước
   */
  async delete(id: string): Promise<{ message: string }> {
    const api = getAdminApi();
    const response = await api.delete<{ message: string }>(`${API_PREFIX}/${id}`);
    return response.data;
  },
};

