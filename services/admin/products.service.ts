import { getAdminApi } from "@/common/axios";
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductQueryDto,
  PaginatedProductResponse,
} from "@/types/product";

const API_PREFIX = "/admin/products";

export const productsService = {
  /**
   * Lấy danh sách sản phẩm
   */
  async getAll(query?: ProductQueryDto): Promise<PaginatedProductResponse> {
    const api = getAdminApi();
    const response = await api.get<PaginatedProductResponse>(API_PREFIX, {
      params: query,
    });
    return response.data;
  },

  /**
   * Lấy chi tiết một sản phẩm
   */
  async getOne(id: string): Promise<Product> {
    const api = getAdminApi();
    const response = await api.get<Product>(`${API_PREFIX}/${id}`);
    return response.data;
  },

  /**
   * Tạo sản phẩm mới
   */
  async create(data: CreateProductDto): Promise<Product> {
    const api = getAdminApi();
    const response = await api.post<Product>(API_PREFIX, data);
    return response.data;
  },

  /**
   * Cập nhật sản phẩm
   */
  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const api = getAdminApi();
    const response = await api.patch<Product>(`${API_PREFIX}/${id}`, data);
    return response.data;
  },

  /**
   * Xóa sản phẩm
   */
  async delete(id: string): Promise<{ message: string }> {
    const api = getAdminApi();
    const response = await api.delete<{ message: string }>(`${API_PREFIX}/${id}`);
    return response.data;
  },
};

