import { getAdminApi } from "@/common/axios";
import type {
  Discount,
  CreateDiscountDto,
  UpdateDiscountDto,
  DiscountQueryDto,
  PaginatedDiscountResponse,
} from "@/types/discount";

const API_PREFIX = "/admin/discounts";

export const discountsService = {
  /**
   * Lấy danh sách mã giảm giá
   */
  async getAll(query?: DiscountQueryDto): Promise<PaginatedDiscountResponse> {
    const api = getAdminApi();
    const response = await api.get<PaginatedDiscountResponse>(API_PREFIX, {
      params: query,
    });
    return response.data;
  },

  /**
   * Lấy chi tiết một mã giảm giá
   */
  async getOne(id: string): Promise<Discount> {
    const api = getAdminApi();
    const response = await api.get<Discount>(`${API_PREFIX}/${id}`);
    return response.data;
  },

  /**
   * Tạo mã giảm giá mới
   */
  async create(data: CreateDiscountDto): Promise<Discount> {
    const api = getAdminApi();
    const response = await api.post<Discount>(API_PREFIX, data);
    return response.data;
  },

  /**
   * Cập nhật mã giảm giá
   */
  async update(id: string, data: UpdateDiscountDto): Promise<Discount> {
    const api = getAdminApi();
    const response = await api.patch<Discount>(`${API_PREFIX}/${id}`, data);
    return response.data;
  },

  /**
   * Xóa mã giảm giá
   */
  async delete(id: string): Promise<{ message: string }> {
    const api = getAdminApi();
    const response = await api.delete<{ message: string }>(`${API_PREFIX}/${id}`);
    return response.data;
  },
};

