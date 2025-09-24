"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  amount: number
}

const formatCurrencyVND = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 })

export const PaymentModal = ({ open, onOpenChange, amount }: Props) => {
  const router = useRouter()
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-lg">
        <h3 className="text-lg font-extrabold text-crexy-secondary mb-2">Quét QR để thanh toán</h3>
        <p className="text-sm text-gray-600 mb-4">Số tiền: <span className="font-semibold">{formatCurrencyVND(amount)}</span></p>
        <div className="flex justify-center mb-4">
          <Image src="/images/qr-placeholder.png" alt="QR code" width={240} height={240} className="h-60 w-60 rounded-md bg-gray-100 object-contain" />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Đóng</Button>
          <Button onClick={() => { onOpenChange(false); router.push("/products") }} className="bg-gray-900 hover:bg-gray-800 text-white">Hoàn tất</Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal


