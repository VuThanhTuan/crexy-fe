"use client"

import { create } from "zustand"
import { getPublicApi } from "@/common/axios"

type Media = {
  id: string
  name: string
  url: string
  mimeType?: string
}

type CollectionDto = {
  id: string
  name: string
  slug?: string
  media?: Media
  productCount?: number
}

type CollectionState = {
  collections: CollectionDto[]
  loading: boolean
  error?: string | null
  fetchCollections: (force?: boolean) => Promise<void>
}

export const useCollectionStore = create<CollectionState>((set, get) => ({
  collections: [],
  loading: false,
  error: null,
  fetchCollections: async (force = false) => {
    if (!force && get().collections.length > 0) return
    set({ loading: true, error: null })
    try {
      const client = getPublicApi()
      const res = await client.get('/collections/menu')
      const data = res.data as CollectionDto[]
      set({ collections: data || [], loading: false })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      set({ error: message || 'Failed to load collections', loading: false })
    }
  },
}))

export default useCollectionStore
