export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  backgroundImage?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
  parent?: Category;
  childrens?: Category[];
}

export interface CreateCategoryDto {
  name: string;
  slug?: string;
  description?: string;
  backgroundImage?: string;
  parentId?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
  backgroundImage?: string;
  parentId?: string;
}

export interface CategoryQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  parentId?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedCategoryResponse {
  data: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

