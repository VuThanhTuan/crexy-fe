"use client"

import { useEffect } from "react"
import { useClickOutside } from "@/hooks/use-click-outside"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { useCategoryStore } from "@/hooks/use-category-store"
import { useCollectionStore } from "@/hooks/use-collection-store"

type MenuModalProps = {
  open: boolean
  onClose: () => void
}

interface MenuItem {
  id: string
  title: string
  href?: string
  children?: MenuItem[]
}

// Menu data is composed of static items plus dynamic categories fetched from the API

export const MenuModal = ({ open, onClose }: MenuModalProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  const panelRef = useClickOutside<HTMLDivElement>(() => onClose())

  // Categories store: fetch once and reuse
  const categories = useCategoryStore((s) => s.categories)
  const fetchCategories = useCategoryStore((s) => s.fetchCategories)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Build products children from categories (top-level categories)
  const productsChildren: MenuItem[] = (
    categories || []
  )
    .filter((c) => !c.parentId)
    .map((c) => ({
      id: c.id,
      title: c.name,
      href: c.slug ? `/products/${c.slug}` : "/products",
      children: c.children
        ? c.children.map((ch) => ({
            id: ch.id,
            title: ch.name,
            href: ch.slug ? `/products/${ch.slug}` : "/products",
          }))
        : undefined,
    }))

  // Collections for menu (top ~5) fetched and cached in store
  const collections = useCollectionStore((s) => s.collections)
  const fetchCollections = useCollectionStore((s) => s.fetchCollections)

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  const collectionsChildren: MenuItem[] = (collections || []).map((col) => ({
    id: col.id,
    title: col.name,
    href: col.slug ? `/collections/${col.slug}` : '/collections',
  }))

  const menuData: MenuItem[] = [
    { id: "home", title: "Trang chủ", href: "/" },
    { id: "products", title: "Tất cả sản phẩm", href: "/products", children: productsChildren },
    {
      id: "collections",
      title: "Bộ sưu tập",
      href: "/collections",
      children: collectionsChildren,
    },
    { id: "about", title: "Về chúng tôi", href: "/about" },
  ]

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            ref={panelRef}
            className="absolute left-0 top-0 h-full w-[360px] bg-white shadow-xl border-r flex flex-col"
            initial={{ x: -360 }}
            animate={{ x: 0 }}
            exit={{ x: -360 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-lg font-medium text-gray-900">Menu</div>
              <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-4 space-y-1">
                {menuData.map((item) => (
                  <div key={item.id}>
                    {/* Main category */}
                    <div className="py-3">
                      <Link href={item.href || "#"} onClick={onClose} className="block w-full py-2 text-left hover:bg-gray-50 transition-colors">
                        <span className="text-base font-semibold text-gray-900">{item.title}</span>
                      </Link>
                    </div>
                    
                    {/* Subcategories */}
                    {item.children && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href || "#"}
                            onClick={onClose}
                            className="block w-full py-2 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm text-gray-700">{subItem.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t">
              <div className="text-sm text-gray-600">
                <p className="mb-2">Chúng tôi có thể giúp gì cho bạn?</p>
                <p className="font-medium">+84 2838614107</p>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export default MenuModal
