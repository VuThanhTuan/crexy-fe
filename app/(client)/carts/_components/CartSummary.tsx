"use client"

import { useCartStore } from "@/hooks/use-cart-store"
import { Button } from "@/components/ui/button"

const formatCurrencyVND = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 })

export const CartSummary = () => {
  const subtotal = useCartStore(s => s.subtotal())
  const totalQuantity = useCartStore(s => s.totalQuantity())

  return (
    <div className="border bg-white p-6">
      <h3 className="font-extrabold text-crexy-secondary mb-4">TỔNG ĐƠN HÀNG | {totalQuantity} sản phẩm</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between"><span>Tổng</span><span>{formatCurrencyVND(subtotal)}</span></div>
        <div className="flex items-center justify-between"><span>Thuế</span><span>0 VND</span></div>
        <div className="flex items-center justify-between font-semibold"><span>Tổng cộng</span><span>{formatCurrencyVND(subtotal)}</span></div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Miễn phí giao hàng áp dụng cho đơn hàng giao tận nơi từ 500.000VND và tất cả các đơn nhận tại cửa hàng.
      </p>

      <div className="mt-6 space-y-3">
        <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">Thanh toán</Button>
        <Button variant="secondary" className="w-full bg-crexy-primary text-white hover:bg-crexy-primary/90">Tiếp tục mua</Button>
      </div>
    </div>
  )
}

export default CartSummary


