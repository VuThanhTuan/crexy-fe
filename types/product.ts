export interface ProductVariant {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  productSizeId?: string;
  productColorId?: string;
  price: number;
  productSize?: {
    id: string;
    name: string;
    description?: string;
  };
  productColor?: {
    id: string;
    name: string;
    colorCode: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductMedia {
  id: string;
  mediaId: string;
  mediaCategory: string;
  media?: {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductAttribute {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  categoryId: string;
  discountId?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  discount?: {
    id: string;
    name: string;
    discountValue: number;
    discountType: string;
  };
  productVariants?: ProductVariant[];
  productMedia?: ProductMedia[];
  productAttributes?: ProductAttribute[];
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

export interface CreateProductDto {
  name: string;
  description?: string;
  isActive?: boolean;
  categoryId: string;
  discountId?: string | null;
  price: number;
  mediaItems: {
    mediaId: string;
    mediaCategory: string;
  }[];
  variants: {
    sizeId: string;
    colorId: string;
    isActive: boolean;
    price: number;
  }[];
  productAttributes?: {
    name: string;
    value: string;
  }[];
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  isActive?: boolean;
  categoryId?: string;
  discountId?: string | null;
  price?: number;
  mediaItems?: {
    mediaId: string;
    mediaCategory: string;
  }[];
  variants?: {
    sizeId: string;
    colorId: string;
    isActive: boolean;
    price: number;
  }[];
  productAttributes?: {
    name: string;
    value: string;
  }[];
}

export interface ProductQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedProductResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

