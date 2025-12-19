import { AxiosInstance } from "axios";
import { getStoreApi } from "@/common/axios";
import type { Collection, PaginatedCollectionResponse, CollectionQueryDto } from "@/types/collection";

/**
 * Lấy danh sách bộ sưu tập (có phân trang)
 */
export async function fetchCollections(
  query?: CollectionQueryDto,
  api?: AxiosInstance
): Promise<PaginatedCollectionResponse> {
  const client = api ?? (await getStoreApi({ ssr: true }));
  const { data } = await client.get(`/collections`, { params: query });
  return data as PaginatedCollectionResponse;
}

/**
 * Lấy danh sách bộ sưu tập cho menu (tối đa 5)
 */
export async function fetchCollectionsForMenu(api?: AxiosInstance): Promise<Collection[]> {
  const client = api ?? (await getStoreApi({ ssr: true }));
  const { data } = await client.get(`/collections/menu`);
  return data as Collection[];
}

/**
 * Lấy chi tiết bộ sưu tập theo slug (kèm danh sách sản phẩm)
 */
export async function fetchCollectionBySlug(slug: string, api?: AxiosInstance): Promise<Collection> {
  const client = api ?? (await getStoreApi({ ssr: true }));
  const { data } = await client.get(`/collections/${slug}`);
  return data as Collection;
}
