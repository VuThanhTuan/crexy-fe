"use client"

import Image from "next/image"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useClickOutside } from "@/hooks/use-click-outside"
import { useCartStore } from "@/hooks/use-cart-store"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

type MiniCartProps = {
  open: boolean
  onClose: () => void
}

const formatCurrencyVND = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 })

export const MiniCart = ({ open, onClose }: MiniCartProps) => {
  const items = useCartStore(s => s.items)
  const subtotal = useCartStore(s => s.subtotal())
  const router = useRouter()

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
        <div className="fixed inset-0 z-40">
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
            className="absolute right-0 top-0 h-full w-[360px] bg-white shadow-xl border-l flex flex-col"
            initial={{ x: 380 }}
            animate={{ x: 0 }}
            exit={{ x: 380 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div className="text-sm font-semibold">Giỏ hàng</div>
              <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">Đóng</button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {items.length === 0 && (
                <div className="text-sm text-gray-500">Chưa có sản phẩm nào</div>
              )}
              {items.map(item => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="grid grid-cols-[96px_1fr] gap-3">
                  <div className="relative h-28 w-24 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="text-[13px] font-semibold line-clamp-2">{item.name}</div>
                      <div className="mt-1 text-xs text-gray-500">
                        {item.color && <span className="mr-2">{item.color}</span>}
                        {item.size && <span>{item.size}</span>}
                      </div>
                    </div>
                    <div className="text-[13px]">
                      {item.quantity} × {formatCurrencyVND(item.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Tổng</span>
                <span className="font-semibold">{formatCurrencyVND(subtotal)}</span>
              </div>
              <div className="space-y-2">
                <Button onClick={() => { onClose(); router.push("/carts") }} className="w-full bg-gray-900 hover:bg-gray-800 text-white uppercase">Xem giỏ hàng</Button>
                <Button onClick={() => { onClose(); router.push("/checkout") }} disabled={items.length === 0} className="w-full uppercase" variant="secondary">Thanh toán</Button>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export default MiniCart


