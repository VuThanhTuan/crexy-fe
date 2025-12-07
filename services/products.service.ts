import { AxiosInstance } from "axios";
import { getStoreApi } from "@/common/axios";
import type { Product as FEProduct, ProductVariant } from "@/types/product";

export type ProductDetail = FEProduct;

export async function fetchProductById(productId: string, api?: AxiosInstance): Promise<ProductDetail> {
  const client = api ?? (await getStoreApi({ ssr: true }));
  const { data } = await client.get(`/products/${productId}`);
  return data as ProductDetail;
}

export type RelatedProduct = {
  id: string;
  name: string;
  price: number;
  primaryImageUrl?: string;
  secondaryImageUrl?: string;
  discount?: { discountValue: number; discountType: string };
  productVariants?: ProductVariant[];
};

export async function fetchRelatedProducts(categoryId: string, limit = 10, api?: AxiosInstance): Promise<RelatedProduct[]> {
  const client = api ?? (await getStoreApi({ ssr: true }));
  const { data } = await client.get(`/products/top`, {
    params: { limit, categoryId },
  });
  type RawProduct = { 
    id: string; 
    name: string; 
    price: number; 
    primaryImage?: { url?: string }; 
    secondaryImage?: { url?: string };
    discount?: { discountValue: number; discountType: string };
    productVariants?: ProductVariant[];
  };
  return (data as RawProduct[]).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    primaryImageUrl: p?.primaryImage?.url ?? p?.secondaryImage?.url,
    secondaryImageUrl: p?.secondaryImage?.url ?? p?.primaryImage?.url,
    discount: p.discount,
    productVariants: p.productVariants,
  }));
}

export function extractImages(product: ProductDetail): string[] {
  const primary = product.primaryImage?.url ? [product.primaryImage.url] : [];
  const gallery = (product.productMedia ?? [])
    .map((m) => m.media?.url)
    .filter((u): u is string => !!u);
  const images = [...primary, ...gallery];
  // fallback to placeholder if none
  return images.length ? images : ["/images/List1.jpg"];
}

export type VariantView = {
  id: string;
  price: number;
  colorName?: string;
  sizeName?: string;
};

export function mapVariants(product: ProductDetail): VariantView[] {
  const variants = product.productVariants ?? [];
  return variants.map((v: ProductVariant) => ({
    id: v.id,
    price: v.price,
    colorName: v.productColor?.name,
    sizeName: v.productSize?.name,
  }));
}

export function uniqueDefined(values: (string | undefined | null)[]): string[] {
  return Array.from(new Set(values.filter((v): v is string => !!v)));
}
