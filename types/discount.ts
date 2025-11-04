export type DiscountType = 'percentage' | 'fixed';

export interface Discount {
  id: string;
  name: string;
  value?: string;
  discountType: DiscountType;
  discountValue: number;
  createdAt: Date;
  updatedAt: Date;
  productCount?: number;
}

export interface CreateDiscountDto {
  name: string;
  value?: string;
  discountType: DiscountType;
  discountValue: number;
}

export interface UpdateDiscountDto {
  name?: string;
  value?: string;
  discountType?: DiscountType;
  discountValue?: number;
}

export interface DiscountQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  discountType?: DiscountType;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedDiscountResponse {
  data: Discount[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

