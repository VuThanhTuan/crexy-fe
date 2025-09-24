"use client"

import { useState } from "react"
import { useCartStore } from "@/hooks/use-cart-store"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/StarRating"
import { QuantitySelector } from "@/components/QuantitySelector"
import { ColorSizeSelector } from "@/components/ColorSizeSelector"
import { ShoppingCart, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductInfoProps {
    product: {
        id: string
        name: string
        price: number
        discount?: number
        description: string
        collectionName: string
    }
    className?: string
}

export const ProductInfo = ({ product, className }: ProductInfoProps) => {
    const [selectedColor, setSelectedColor] = useState("Xám")
    const [selectedSize, setSelectedSize] = useState("M")
    const [quantity, setQuantity] = useState(1)

    const hasDiscount = typeof product.discount === "number" && product.discount > 0
    const discountedPrice = hasDiscount ? Math.round(product.price * (1 - (product.discount as number) / 100)) : null

    const formatCurrencyVND = (value: number) =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 })

    const colors = ["Xám", "Xanh", "Đỏ"]
    const sizes = ["M", "L", "XL", "XXL"]

    const addItem = useCartStore(s => s.addItem)
    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: hasDiscount ? (discountedPrice as number) : product.price,
            image: "/images/List1.jpg",
            color: selectedColor,
            size: selectedSize,
        }, quantity)
    }

    const handleBuyNow = () => {
        handleAddToCart()
        // Could navigate to /carts in a real flow
        window.location.href = "/carts"
    }

    return (
        <div className={cn("space-y-6", className)}>
            {/* Product Title */}
            <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    {product.collectionName}
                </p>
                <h1 className="text-3xl font-bold text-gray-900">
                    {product.name}
                </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <StarRating rating={3.5} showNumber />
                <span className="text-sm text-gray-500">(4 đánh giá)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    {hasDiscount ? (
                        <>
                            <span className="text-3xl font-bold text-crexy-primary">
                                {formatCurrencyVND(discountedPrice as number)}
                            </span>
                            <span className="text-xl text-gray-400 line-through">
                                {formatCurrencyVND(product.price)}
                            </span>
                            <span className="bg-orange-500 text-white px-2 py-1 text-sm font-bold rounded">
                                -{product.discount}%
                            </span>
                        </>
                    ) : (
                        <span className="text-3xl font-bold text-crexy-primary">
                            {formatCurrencyVND(product.price)}
                        </span>
                    )}
                </div>
            </div>

            {/* Description */}
            <div>
                <p className="text-gray-600 leading-relaxed">
                    {product.description}
                </p>
            </div>

            {/* Color Selection */}
            <ColorSizeSelector
                type="color"
                options={colors}
                selectedValue={selectedColor}
                onValueChange={setSelectedColor}
            />

            {/* Size Selection */}
            <ColorSizeSelector
                type="size"
                options={sizes}
                selectedValue={selectedSize}
                onValueChange={setSelectedSize}
            />

            {/* Quantity Selection */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Số lượng</h3>
                <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={10}
                />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={handleAddToCart}
                        className="flex-1 bg-crexy-primary hover:bg-crexy-primary/90 text-white"
                        size="lg"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Thêm vào giỏ
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-4 sm:px-6"
                    >
                        <Heart className="w-5 h-5" />
                    </Button>
                </div>
                
                <Button
                    onClick={handleBuyNow}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    size="lg"
                >
                    Mua ngay
                </Button>
            </div>

            {/* Size Chart Link */}
            <div className="pt-4 border-t">
                <button className="text-sm text-crexy-primary hover:underline">
                    Bảng quy đổi kích cỡ
                </button>
            </div>
        </div>
    )
}
