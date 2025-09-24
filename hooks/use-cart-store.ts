"use client"

import { create } from "zustand"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  color?: string
  size?: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  updateQuantity: (id: string, delta: number, color?: string, size?: string) => void
  removeItem: (id: string, color?: string, size?: string) => void
  clear: () => void
  totalQuantity: () => number
  subtotal: () => number
}

const STORAGE_KEY = "crexy.cart.v1"

const loadFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

const saveToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export const useCartStore = create<CartState>((set, get) => ({
  items: loadFromStorage(),
  addItem: (item, quantity = 1) => {
    set(state => {
      const existingIndex = state.items.findIndex(
        i => i.id === item.id && i.color === item.color && i.size === item.size
      )
      let next: CartItem[]
      if (existingIndex !== -1) {
        next = state.items.slice()
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Math.min(99, next[existingIndex].quantity + quantity),
        }
      } else {
        next = [...state.items, { ...item, quantity }]
      }
      saveToStorage(next)
      return { items: next }
    })
  },
  updateQuantity: (id, delta, color, size) => {
    set(state => {
      const next = state.items
        .map(i => {
          if (i.id === id && i.color === color && i.size === size) {
            const newQty = Math.max(1, Math.min(99, i.quantity + delta))
            return { ...i, quantity: newQty }
          }
          return i
        })
        .filter(i => i.quantity > 0)
      saveToStorage(next)
      return { items: next }
    })
  },
  removeItem: (id, color, size) => {
    set(state => {
      const next = state.items.filter(i => !(i.id === id && i.color === color && i.size === size))
      saveToStorage(next)
      return { items: next }
    })
  },
  clear: () => {
    saveToStorage([])
    set({ items: [] })
  },
  totalQuantity: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
  subtotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
}))


