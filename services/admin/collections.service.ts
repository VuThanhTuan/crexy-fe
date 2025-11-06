import { getAdminApi } from "@/common/axios";
import type {
  Collection,
  CreateCollectionDto,
  UpdateCollectionDto,
  CollectionQueryDto,
  PaginatedCollectionResponse,
} from "@/types/collection";

const API_PREFIX = "/admin/collections";

export const collectionsService = {
  /**
   * Lấy danh sách bộ sưu tập
   */
  async getAll(query?: CollectionQueryDto): Promise<PaginatedCollectionResponse> {
    const api = getAdminApi();
    const response = await api.get<PaginatedCollectionResponse>(API_PREFIX, {
      params: query,
    });
    return response.data;
  },

  /**
   * Lấy chi tiết một bộ sưu tập
   */
  async getOne(id: string): Promise<Collection> {
    const api = getAdminApi();
    const response = await api.get<Collection>(`${API_PREFIX}/${id}`);
    return response.data;
  },

  /**
   * Tạo bộ sưu tập mới
   */
  async create(data: CreateCollectionDto): Promise<Collection> {
    const api = getAdminApi();
    const response = await api.post<Collection>(API_PREFIX, data);
    return response.data;
  },

  /**
   * Cập nhật bộ sưu tập
   */
  async update(id: string, data: UpdateCollectionDto): Promise<Collection> {
    const api = getAdminApi();
    const response = await api.patch<Collection>(`${API_PREFIX}/${id}`, data);
    return response.data;
  },

  /**
   * Xóa bộ sưu tập
   */
  async delete(id: string): Promise<{ message: string }> {
    const api = getAdminApi();
    const response = await api.delete<{ message: string }>(`${API_PREFIX}/${id}`);
    return response.data;
  },
};
