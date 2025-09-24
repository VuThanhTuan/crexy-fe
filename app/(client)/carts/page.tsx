"use client"

import { useEffect } from "react"
import { useCartStore } from "@/hooks/use-cart-store"
import { CartItem } from "./_components/CartItem"
import { CartSummary } from "./_components/CartSummary"
import { ProductBox } from "@/components/ProductBox"
import { sampleProducts } from "@/data/products"
import TopBar from "../_components/top-bar"
import { Footer } from "../_components/footer"
import { CartBreadcrumb } from "@/components/CartBreadcrumb"

export default function CartPage() {
  const items = useCartStore(s => s.items)

  // ensure hydration loads latest localStorage once on mount
  const setFromStorage = useCartStore.setState
  useEffect(() => {
    // noop: state constructed from storage already, but call set to trigger subscribers if needed
    setFromStorage(s => ({ items: s.items }))
  }, [setFromStorage])

  return (
    <div className="bg-gray-50 min-h-screen overflow-y-auto">
      <TopBar variant="solid" />

      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <CartBreadcrumb items={[{ label: "Trang chủ", href: "/", showHomeIcon: true }, { label: "Giỏ hàng" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold text-crexy-secondary mb-6">GIỎ HÀNG</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="border bg-white p-8 text-center text-gray-600">Chưa có sản phẩm nào trong giỏ hàng</div>
            ) : (
              items.map(item => <CartItem key={`${item.id}-${item.color}-${item.size}`} item={item} />)
            )}
          </div>

          <CartSummary />
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-extrabold text-crexy-secondary mb-4">SẢN PHẨM BÁN CHẠY</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {sampleProducts.slice(0, 5).map(p => (
              <ProductBox key={p.id} product={p} width="w-full" height="h-[420px]" />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

