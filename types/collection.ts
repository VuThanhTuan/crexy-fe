export interface Media {
  id: string;
  name: string;
  url: string;
  mimeType?: string;
}

export interface ProductInCollection {
  id: string;
  name: string;
  price?: number;
  primaryImage?: {
    id: string;
    name: string;
    originName: string;
    url: string;
    mediaType: string;
    mimeType: string;
    size?: number;
    width?: number;
    height?: number;
  };
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  media?: Media;
  products?: ProductInCollection[];
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCollectionDto {
  name: string;
  description?: string;
  slug?: string;
  mediaId?: string;
  productIds?: string[];
}

export interface UpdateCollectionDto extends Partial<CreateCollectionDto> {}

export interface CollectionQueryDto {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface PaginatedCollectionResponse {
  data: Collection[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
