export interface ProductSize {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductSizeDto {
  name: string;
  description?: string;
}

export interface UpdateProductSizeDto {
  name?: string;
  description?: string;
}

export interface ProductSizeQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedProductSizeResponse {
  data: ProductSize[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

