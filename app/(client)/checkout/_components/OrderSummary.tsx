"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CartItem as Item } from "@/hooks/use-cart-store"

const formatCurrencyVND = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 })

type Props = {
  items: Item[]
  subtotal: number
  shipping: number
  total: number
  onCheckout: () => void
}

export const OrderSummary = ({ items, subtotal, shipping, total, onCheckout }: Props) => {
  return (
    <div className="border bg-white p-6">
      <h3 className="font-extrabold text-crexy-secondary mb-4">ĐƠN HÀNG CỦA BẠN</h3>
      <div className="divide-y">
        {items.map((i) => (
          <div key={`${i.id}-${i.color}-${i.size}`} className="flex items-center justify-between py-3 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Image src={i.image} alt={i.name} width={56} height={56} className="h-14 w-14 object-cover" />
              <div className="truncate">
                <div className="text-sm font-medium text-crexy-secondary truncate">{i.name}</div>
                <div className="text-xs text-gray-500">{i.size ? `Size ${i.size}` : ""}{i.color ? ` · ${i.color}` : ""} × {i.quantity}</div>
              </div>
            </div>
            <div className="text-sm font-medium whitespace-nowrap">{formatCurrencyVND(i.price * i.quantity)}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between"><span>Tạm tính</span><span>{formatCurrencyVND(subtotal)}</span></div>
        <div className="flex items-center justify-between"><span>Phí vận chuyển</span><span>{formatCurrencyVND(shipping)}</span></div>
        <div className="flex items-center justify-between font-semibold text-crexy-secondary"><span>Tổng</span><span>{formatCurrencyVND(total)}</span></div>
      </div>

      <div className="mt-6">
        <Button onClick={onCheckout} className="w-full bg-gray-900 hover:bg-gray-800 text-white">Thanh toán</Button>
      </div>
    </div>
  )
}

export default OrderSummary


