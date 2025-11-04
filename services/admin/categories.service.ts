import { getAdminApi } from "@/common/axios";
import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryQueryDto,
  PaginatedCategoryResponse,
} from "@/types/category";

const API_PREFIX = "/admin/categories";

export const categoriesService = {
  /**
   * Lấy danh sách danh mục
   */
  async getAll(query?: CategoryQueryDto): Promise<PaginatedCategoryResponse> {
    const api = getAdminApi();
    const response = await api.get<PaginatedCategoryResponse>(API_PREFIX, {
      params: query,
    });
    return response.data;
  },

  /**
   * Lấy chi tiết một danh mục
   */
  async getOne(id: string): Promise<Category> {
    const api = getAdminApi();
    const response = await api.get<Category>(`${API_PREFIX}/${id}`);
    return response.data;
  },

  /**
   * Tạo danh mục mới
   */
  async create(data: CreateCategoryDto): Promise<Category> {
    const api = getAdminApi();
    const response = await api.post<Category>(API_PREFIX, data);
    return response.data;
  },

  /**
   * Cập nhật danh mục
   */
  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    const api = getAdminApi();
    const response = await api.patch<Category>(`${API_PREFIX}/${id}`, data);
    return response.data;
  },

  /**
   * Xóa danh mục
   */
  async delete(id: string): Promise<{ message: string }> {
    const api = getAdminApi();
    const response = await api.delete<{ message: string }>(`${API_PREFIX}/${id}`);
    return response.data;
  },
};

