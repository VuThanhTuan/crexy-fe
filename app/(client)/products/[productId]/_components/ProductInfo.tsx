"use client"

import { useMemo, useState } from "react"
import { useCartStore } from "@/hooks/use-cart-store"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/StarRating"
import { QuantitySelector } from "@/components/QuantitySelector"
import { ColorSelector } from "./ColorSelector"
import { SizeSelector } from "./SizeSelector"
import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

type VariantView = {
    id: string
    price: number
    colorName?: string
    sizeName?: string
}

export type ColorOption = { name: string; colorCode: string };
interface ProductInfoProps {
    product: {
        id: string
        name: string
        basePrice: number
        discountPercent?: number
        description: string
        collectionName: string
    }
    variants: VariantView[]
    colors: ColorOption[]
    sizes: string[]
    className?: string
}

export const ProductInfo = ({ product, variants, colors, sizes, className }: ProductInfoProps) => {
    const [selectedColor, setSelectedColor] = useState(colors[0]?.name ?? "")
    const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "")
    const [quantity, setQuantity] = useState(1)

    const matchedVariant = useMemo(
        () => variants.find(v => v.colorName === selectedColor && v.sizeName === selectedSize),
        [variants, selectedColor, selectedSize]
    )

    const priceToShow = matchedVariant?.price ?? product.basePrice
    const hasDiscount = typeof product.discountPercent === "number" && product.discountPercent > 0
    const discountedPrice = hasDiscount ? Math.round(priceToShow * (1 - (product.discountPercent as number) / 100)) : null

    const formatCurrencyVND = (value: number) =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 })

    const addItem = useCartStore(s => s.addItem)
    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: hasDiscount ? (discountedPrice as number) : (priceToShow as number),
            image: "/images/List1.jpg",
            color: selectedColor,
            size: selectedSize,
        }, quantity)
    }

    const handleBuyNow = () => {
        handleAddToCart()
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
                                {formatCurrencyVND(Number(priceToShow))}
                            </span>
                            <span className="bg-orange-500 text-white px-2 py-1 text-sm font-bold rounded">
                                -{product.discountPercent}%
                            </span>
                        </>
                    ) : (
                        <span className="text-3xl font-bold text-crexy-primary">
                            {formatCurrencyVND(priceToShow)}
                        </span>
                    )}
                </div>
            </div>

            {/* Color Selection */}
            {colors.length > 0 && (
                <ColorSelector
                    options={colors}
                    selectedValue={selectedColor}
                    onValueChange={setSelectedColor}
                />
            )}

            {/* Size Selection */}
            {sizes.length > 0 && (
                <SizeSelector
                    options={sizes}
                    selectedValue={selectedSize}
                    onValueChange={setSelectedSize}
                />
            )}

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

                    <Button
                        onClick={handleAddToCart}
                        className="w-full bg-crexy-primary hover:bg-crexy-primary/90 text-white"
                        size="lg"
                        disabled={!matchedVariant}
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Thêm vào giỏ
                    </Button>

                
                <Button
                    onClick={handleBuyNow}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    size="lg"
                    disabled={!matchedVariant}
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
