"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const BillingForm = () => {
  return (
    <div className="border bg-white p-6">
      <h3 className="text-lg font-extrabold text-crexy-secondary mb-4">THÔNG TIN THANH TOÁN</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Họ</label>
          <Input placeholder="Nguyen" required className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Tên</label>
          <Input placeholder="An" required className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Quốc gia/Khu vực</label>
          <Input value="Việt Nam" readOnly className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Tỉnh/Thành</label>
          <Input placeholder="Hà Nội" required className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Quận/Huyện</label>
          <Input placeholder="Ba Đình" required className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Địa chỉ</label>
          <Input placeholder="Số nhà, tên đường" required className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Số điện thoại</label>
          <Input type="tel" placeholder="0989xxxxxx" required className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="you@example.com" required className="mt-1" />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium">Ghi chú đơn hàng (tuỳ chọn)</label>
        <Textarea placeholder="Ghi chú cho đơn hàng, ví dụ thời gian giao..." className="mt-1" />
      </div>
    </div>
  )
}

export default BillingForm


