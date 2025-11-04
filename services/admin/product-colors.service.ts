import { getAdminApi } from "@/common/axios";
import type {
  ProductColor,
  CreateProductColorDto,
  UpdateProductColorDto,
  ProductColorQueryDto,
  PaginatedProductColorResponse,
} from "@/types/product-color";

const API_PREFIX = "/admin/product-colors";

export const productColorsService = {
  /**
   * Lấy danh sách màu sắc sản phẩm
   */
  async getAll(query?: ProductColorQueryDto): Promise<PaginatedProductColorResponse> {
    const api = getAdminApi();
    const response = await api.get<PaginatedProductColorResponse>(API_PREFIX, {
      params: query,
    });
    return response.data;
  },

  /**
   * Lấy chi tiết một màu sắc
   */
  async getOne(id: string): Promise<ProductColor> {
    const api = getAdminApi();
    const response = await api.get<ProductColor>(`${API_PREFIX}/${id}`);
    return response.data;
  },

  /**
   * Tạo màu sắc mới
   */
  async create(data: CreateProductColorDto): Promise<ProductColor> {
    const api = getAdminApi();
    const response = await api.post<ProductColor>(API_PREFIX, data);
    return response.data;
  },

  /**
   * Cập nhật màu sắc
   */
  async update(id: string, data: UpdateProductColorDto): Promise<ProductColor> {
    const api = getAdminApi();
    const response = await api.patch<ProductColor>(`${API_PREFIX}/${id}`, data);
    return response.data;
  },

  /**
   * Xóa màu sắc
   */
  async delete(id: string): Promise<{ message: string }> {
    const api = getAdminApi();
    const response = await api.delete<{ message: string }>(`${API_PREFIX}/${id}`);
    return response.data;
  },
};

