export type MediaType = 'image' | 'video';

export interface Media {
  id: string;
  name: string;
  originName: string;
  mediaType: MediaType;
  mimeType: string;
  url: string;
  size?: number;
  width?: number;
  height?: number;
  createdAt: Date;
  updatedAt: Date;
  isInUse?: boolean;
}

export interface CreateMediaDto {
  name: string;
  originName: string;
  mediaType: MediaType;
  mimeType: string;
  url: string;
  size?: number;
  width?: number;
  height?: number;
}

export interface UpdateMediaDto {
  name?: string;
  originName?: string;
  mediaType?: MediaType;
  mimeType?: string;
  url?: string;
  size?: number;
  width?: number;
  height?: number;
}

export interface MediaQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  mediaType?: MediaType;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedMediaResponse {
  data: Media[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UploadMediaResponse {
  message: string;
  data: Media;
}

export interface MediaUsage {
  products: number;
  collections: number;
}

