"use client"

import Image from "next/image"
import { QuantitySelector } from "@/components/QuantitySelector"
import { useCartStore, CartItem as Item } from "@/hooks/use-cart-store"
import { X } from "lucide-react"

type Props = {
  item: Item
}

const formatCurrencyVND = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 })

export const CartItem = ({ item }: Props) => {
  const updateQuantity = useCartStore(s => s.updateQuantity)
  const removeItem = useCartStore(s => s.removeItem)

  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 border bg-white p-4 relative">
      <Image src={item.image} alt={item.name} width={140} height={140} className="h-[180px] w-[140px] object-cover" />
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-extrabold text-crexy-secondary">{item.name}</h3>
          <button
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-700"
            onClick={() => removeItem(item.id, item.color, item.size)}
            aria-label="remove"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          {item.color && (
            <div className="flex items-center gap-2"><span className="w-20">Màu sắc</span><span>{item.color}</span></div>
          )}
          {item.size && (
            <div className="flex items-center gap-2"><span className="w-20">Size</span><span>{item.size}</span></div>
          )}
          <div className="flex items-center gap-2"><span className="w-20">Giá</span><span>{formatCurrencyVND(item.price)}</span></div>
          <div className="flex items-center gap-2"><span className="w-20">Tổng</span><span>{formatCurrencyVND(item.price * item.quantity)}</span></div>
        </div>

        <div className="pt-2">
          <QuantitySelector
            value={item.quantity}
            onChange={(val) => updateQuantity(item.id, val - item.quantity, item.color, item.size)}
            min={1}
            max={99}
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem


