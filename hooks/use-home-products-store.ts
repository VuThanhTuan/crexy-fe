"use client"

import { create } from "zustand"
import { getPublicApi } from "@/common/axios"

export type HomeProduct = {
  id: string
  name: string
  price: number
  image: string
  behindImage: string
  description?: string
  collectionName?: string
  discount?: number
}

type HomeProductsState = {
  products: HomeProduct[]
  loading: boolean
  error?: string | null
  fetchTopProducts: (limit?: number, force?: boolean) => Promise<void>
}

export const useHomeProductsStore = create<HomeProductsState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  fetchTopProducts: async (limit = 4, force = false) => {
    if (!force && get().products.length > 0) return
    set({ loading: true, error: null })
    try {
      const client = getPublicApi()
      const res = await client.get(`/products/top?limit=${limit}`)
      const data = res.data as any[]

      const mapped = (data || []).map(d => {
        // prefer backend discount metadata when available
        let discountPercent: number | undefined
        if (d.discount && typeof d.discount.discountValue === 'number') {
          if (d.discount.discountType === 'percentage') {
            discountPercent = Math.round(d.discount.discountValue)
          } else if (d.discount.discountType === 'fixed' && d.price) {
            discountPercent = Math.round((d.discount.discountValue / d.price) * 100)
          }
        } else {
          // fallback to variant-based calculation
          if (d.productVariants && d.productVariants[0] && d.productVariants[0].price && d.price) {
            discountPercent = Math.round((1 - (d.productVariants[0].price / d.price)) * 100)
          }
        }

        return {
          id: d.id,
          name: d.name,
          price: d.price,
          image: d.primaryImage?.url || '/images/Product2.jpg',
          behindImage: d.secondaryImage?.url || d.primaryImage?.url || '/images/Product2.jpg',
          description: d.description || '',
          collectionName: d.category?.name || '',
          discount: discountPercent,
        }
      }) as HomeProduct[]

      set({ products: mapped, loading: false })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      set({ error: message || 'Failed to load products', loading: false })
    }
  },
}))

export default useHomeProductsStore
