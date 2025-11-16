"use client"

import { create } from "zustand"

interface ModalStore {
  openMiniCart: boolean
  openLogin: boolean
  openSearch: boolean
  openMenu: boolean
  openUserMenu: boolean
  setOpenMiniCart: (open: boolean) => void
  setOpenLogin: (open: boolean) => void
  setOpenSearch: (open: boolean) => void
  setOpenMenu: (open: boolean) => void
  setOpenUserMenu: (open: boolean) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  openMiniCart: false,
  openLogin: false,
  openSearch: false,
  openMenu: false,
  openUserMenu: false,
  setOpenMiniCart: (open) => set({ openMiniCart: open }),
  setOpenLogin: (open) => set({ openLogin: open }),
  setOpenSearch: (open) => set({ openSearch: open }),
  setOpenMenu: (open) => set({ openMenu: open }),
  setOpenUserMenu: (open) => set({ openUserMenu: open }),
}))
