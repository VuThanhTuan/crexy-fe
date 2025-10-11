"use client"

import { useEffect } from "react"
import { useClickOutside } from "@/hooks/use-click-outside"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"

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

const menuData: MenuItem[] = [
  {
    id: "home",
    title: "Trang chủ",
    href: "/"
  },
  {
    id: "products",
    title: "Danh mục sản phẩm",
    href: "/products",
    children: [
      { id: "sleepwear", title: "Đồ ngủ", href: "/products/sleepwear" },
      { id: "homewear", title: "Đồ mặc ở nhà", href: "/products/homewear" },
      { id: "swimwear", title: "Đồ bơi", href: "/products/swimwear" }
    ]
  },
  {
    id: "collections",
    title: "Bộ sưu tập",
    href: "/collections",
    children: [
      { id: "collection1", title: "Bộ sưu tập 1", href: "/collections/collection-1" },
      { id: "collection2", title: "Bộ sưu tập 2", href: "/collections/collection-2" },
      { id: "collection3", title: "Bộ sưu tập 3", href: "/collections/collection-3" }
    ]
  },
  {
    id: "about",
    title: "Về chúng tôi",
    href: "/about"
  }
]

export const MenuModal = ({ open, onClose }: MenuModalProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  const panelRef = useClickOutside<HTMLDivElement>(() => onClose())

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
