"use client"

import { useMemo, useState } from "react"
import TopBar from "../_components/top-bar"
import { Footer } from "../_components/footer"
import { CartBreadcrumb } from "@/components/CartBreadcrumb"
import { useCartStore } from "@/hooks/use-cart-store"
import { BillingForm } from "@/app/(client)/checkout/_components/BillingForm"
import { OrderSummary } from "@/app/(client)/checkout/_components/OrderSummary"
import { PaymentMethods } from "@/app/(client)/checkout/_components/PaymentMethods"
import { PaymentModal } from "@/app/(client)/checkout/_components/PaymentModal"

export default function CheckoutPage() {
  const items = useCartStore(s => s.items)
  const subtotal = useCartStore(s => s.subtotal())

  const [open, setOpen] = useState(false)

  const shippingFee = 0
  const total = useMemo(() => subtotal + shippingFee, [subtotal])

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopBar variant="solid" />

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <CartBreadcrumb items={[{ label: "Trang chủ", href: "/", showHomeIcon: true }, { label: "Thanh toán" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold text-crexy-secondary mb-6">THANH TOÁN</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-8">
          <div className="space-y-8">
            <BillingForm />
            <PaymentMethods />
          </div>

          <OrderSummary items={items} subtotal={subtotal} shipping={shippingFee} total={total} onCheckout={() => setOpen(true)} />
        </div>
      </div>

      <Footer />

      <PaymentModal open={open} onOpenChange={setOpen} amount={total} />
    </div>
  )
}


