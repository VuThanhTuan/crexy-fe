import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"

export type Product = {
    id: string
    name: string
    price: number
    image: string
    behindImage: string
    description: string
    collectionName: string
    discount?: number
}

type ProductBoxProps = {
    className?: string
    product: Product
    width?: string
    height?: string
}

export const ProductBox = ({ 
    className, 
    product, 
    width = "w-[340px]", 
    height = "h-[600px]" 
}: ProductBoxProps) => {
    const { name, price, image, collectionName, discount } = product;
    const [isHovered, setIsHovered] = useState(false);

    const hasDiscount = typeof discount === "number" && discount > 0
    const discountedPrice = hasDiscount ? Math.round(price * (1 - (discount as number) / 100)) : null

    const formatCurrencyVND = (value: number) =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 })

    return (
        <Link href={`/products/${product.id}`}>
            <div
                className={cn(
                    "relative overflow-hidden border-b-2 border-crexy-secondary bg-white cursor-pointer",
                    width,
                    height,
                    className,
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
            <div className="relative h-[78%] w-full">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className={cn(
                        "object-cover transition-opacity duration-400 ease-in-out",
                        isHovered ? "opacity-0" : "opacity-100"
                    )}
                    sizes="(max-width: 768px) 340px, 360px"
                />
                <Image
                    src={product.behindImage}
                    alt={`${name} - alternate view`}
                    fill
                    className={cn(
                        "object-cover transition-opacity duration-400 ease-in-out",
                        isHovered ? "opacity-100" : "opacity-0"
                    )}
                    sizes="(max-width: 768px) 340px, 360px"
                />

                {isHovered && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 transition-opacity duration-200">
                        <div className="rounded bg-white px-4 py-2 text-sm font-semibold text-crexy-secondary uppercase">
                            Chi tiết
                        </div>
                    </div>
                )}

                {hasDiscount && (
                    <div className="absolute left-0 top-0 z-30 bg-orange-500 px-3 py-1 text-xs font-extrabold text-white">
                        -{discount}%
                    </div>
                )}
            </div>

            <div className="flex h-[22%] w-full flex-col items-center justify-between bg-white px-5 pb-5 pt-4 text-center">
                <h3 className="mt-1 max-w-[90%] text-xl font-extrabold leading-tight text-crexy-secondary">
                    {name}
                </h3>

                <h5 className="mt-1 max-w-[90%] text-xl font-extrabold leading-tight text-crexy-secondary">
                    {collectionName}
                </h5>

                <div className="mt-2 w-full px-2">
                    {hasDiscount ? (
                        <div className="grid grid-cols-3 items-center gap-2">
                            <div />
                            <span className="text-base font-extrabold text-crexy-secondary text-center">
                                {formatCurrencyVND(discountedPrice as number)} VNĐ
                            </span>
                            <span className="text-sm font-semibold text-gray-400 line-through text-right">
                                {formatCurrencyVND(price)} VNĐ
                            </span>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <span className="text-base font-extrabold text-crexy-secondary">
                                {formatCurrencyVND(price)} VNĐ
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </Link>
    )
}