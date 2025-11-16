"use client"

import { create } from "zustand"
import { getPublicApi } from "@/common/axios"

type CategoryDto = {
  id: string
  name: string
  slug?: string
  parentId?: string | null
  children?: CategoryDto[]
}

type CategoryState = {
  categories: CategoryDto[]
  loading: boolean
  error?: string | null
  fetchCategories: (force?: boolean) => Promise<void>
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async (force = false) => {
    // avoid refetching if we already have data
    if (!force && get().categories.length > 0) return
    set({ loading: true, error: null })
    try {
      const client = getPublicApi()
      const res = await client.get('/categories')
      const data = res.data as CategoryDto[]
      set({ categories: data || [], loading: false })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      set({ error: message || 'Failed to load categories', loading: false })
    }
  },
}))

export default useCategoryStore
