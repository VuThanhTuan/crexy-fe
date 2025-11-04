import { getAdminApi } from "@/common/axios";
import type {
  Media,
  UpdateMediaDto,
  MediaQueryDto,
  PaginatedMediaResponse,
  UploadMediaResponse,
  MediaUsage,
} from "@/types/media";

const API_PREFIX = "/admin/media";

export const mediaService = {
  /**
   * Lấy danh sách media
   */
  async getAll(query?: MediaQueryDto): Promise<PaginatedMediaResponse> {
    const api = getAdminApi();
    const response = await api.get<PaginatedMediaResponse>(API_PREFIX, {
      params: query,
    });
    return response.data;
  },

  /**
   * Lấy chi tiết một media
   */
  async getOne(id: string): Promise<Media> {
    const api = getAdminApi();
    const response = await api.get<Media>(`${API_PREFIX}/${id}`);
    return response.data;
  },

  /**
   * Upload file
   */
  async upload(file: File): Promise<UploadMediaResponse> {
    const api = getAdminApi();
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<UploadMediaResponse>(
      `${API_PREFIX}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * Cập nhật media
   */
  async update(id: string, data: UpdateMediaDto): Promise<Media> {
    const api = getAdminApi();
    const response = await api.patch<Media>(`${API_PREFIX}/${id}`, data);
    return response.data;
  },

  /**
   * Lấy thông tin sử dụng của media
   */
  async getUsage(id: string): Promise<MediaUsage> {
    const api = getAdminApi();
    const response = await api.get<MediaUsage>(`${API_PREFIX}/${id}/usage`);
    return response.data;
  },

  /**
   * Xóa media
   */
  async delete(id: string): Promise<{ message: string }> {
    const api = getAdminApi();
    const response = await api.delete<{ message: string }>(`${API_PREFIX}/${id}`);
    return response.data;
  },
};

