"use client"

import { create } from "zustand"

interface ModalStore {
  openMiniCart: boolean
  openLogin: boolean
  openSearch: boolean
  setOpenMiniCart: (open: boolean) => void
  setOpenLogin: (open: boolean) => void
  setOpenSearch: (open: boolean) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  openMiniCart: false,
  openLogin: false,
  openSearch: false,
  setOpenMiniCart: (open) => set({ openMiniCart: open }),
  setOpenLogin: (open) => set({ openLogin: open }),
  setOpenSearch: (open) => set({ openSearch: open }),
}))
