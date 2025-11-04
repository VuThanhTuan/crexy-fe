export interface ProductColor {
  id: string;
  name: string;
  colorCode: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductColorDto {
  name: string;
  colorCode: string;
  description?: string;
}

export interface UpdateProductColorDto {
  name?: string;
  colorCode?: string;
  description?: string;
}

export interface ProductColorQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedProductColorResponse {
  data: ProductColor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

