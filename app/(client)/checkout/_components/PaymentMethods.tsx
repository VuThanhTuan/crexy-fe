"use client"

import { useState } from "react"

export const PaymentMethods = () => {
  const [method, setMethod] = useState<"bank" | "card">("bank")
  return (
    <div className="border bg-white p-6">
      <h3 className="text-lg font-extrabold text-crexy-secondary mb-4">PHƯƠNG THỨC THANH TOÁN</h3>
      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input type="radio" name="payment" checked={method === "bank"} onChange={() => setMethod("bank")} />
          <span>Chuyển khoản ngân hàng (Direct bank transfer)</span>
        </label>
        <label className="flex items-center gap-3 opacity-70">
          <input type="radio" name="payment" checked={method === "card"} onChange={() => setMethod("card")} />
          <span>Credit/Debit (hiển thị cho đủ, chưa hỗ trợ)</span>
        </label>
        {method === "bank" && (
          <div className="text-sm text-gray-600 mt-2">
            Vui lòng chuyển khoản theo hướng dẫn sau khi bấm Thanh toán.
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentMethods


