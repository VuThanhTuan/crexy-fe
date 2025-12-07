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
    productVariants?: Array<{
        id: string
        productColor?: {
            id: string
            name: string
            colorCode: string
        }
        productSize?: {
            id: string
            name: string
        }
    }>
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
    const { name, price, image, discount, productVariants } = product;
    const [isHovered, setIsHovered] = useState(false);

    // Extract unique colors from variants (limit to 5)
    const uniqueColors = (() => {
        const colors = new Map<string, string>();
        (productVariants || []).forEach(variant => {
            if (variant.productColor?.id && !colors.has(variant.productColor.id)) {
                colors.set(variant.productColor.id, variant.productColor.colorCode);
            }
        });
        return Array.from(colors.entries()).slice(0, 5);
    })();

    // Extract unique sizes from variants
    const uniqueSizes = (() => {
        const sizes = new Map<string, string>();
        (productVariants || []).forEach(variant => {
            if (variant.productSize?.id && !sizes.has(variant.productSize.id)) {
                sizes.set(variant.productSize.id, variant.productSize.name);
            }
        });
        return Array.from(sizes.values());
    })();

    const hasDiscount = typeof discount === "number" && discount > 0
    const discountedPrice = hasDiscount ? Math.round(price * (1 - (discount as number) / 100)) : null

    const formatCurrencyVND = (value: number) =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 })

    return (
        <Link href={`/products/${product.id}`}>
            <div
                className={cn(
                    "relative overflow-hidden bg-white cursor-pointer",
                    width,
                    height,
                    className,
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative h-[80%] w-full">
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
                            <div className="rounded text-sm bg-white px-1 md:px-2 md:py-1 lg:px-4 lg:py-2 font-semibold text-crexy-secondary uppercase">
                                Chi tiết
                            </div>
                        </div>
                    )}

                    {hasDiscount && (
                        <div className="absolute left-0 top-0 z-1 bg-orange-500 px-2 py-[0.5] lg:px-3 lg:py-1 text-xs font-extrabold text-white">
                            -{discount}%
                        </div>
                    )}
                </div>

                <div className="flex px-2 h-[20%] w-full flex-col bg-white pt-1 pb-1 md:px-2 md:pb-2 md:pt-2 lg:px-5 lg:pb-5 lg:pt-4">
                    <div className="flex justify-between items-center mb-1">
                        <div className="pdb-colors flex gap-1">
                            {uniqueColors.map(([colorId, colorCode]) => (
                                <div
                                    key={colorId}
                                    className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-gray-300"
                                    style={{ backgroundColor: colorCode }}
                                    title={colorCode}
                                />
                            ))}
                        </div>
                        <div className="pdb-sizes text-gray-500 text-xs md:text-sm">
                            {uniqueSizes.length > 0 ? uniqueSizes.join('-') : ''}
                        </div>
                    </div>

                    <h5 className="max-w-[90%] text-sm md:text-md lg:text-xl leading-tight text-crexy-primary">
                        {name}
                    </h5>

                    <div className="w-full">
                        <div className="text-left">
                            <span className="text-sm md:text-md lg:text-xl text-crexy-primary font-semibold">
                                {formatCurrencyVND(Number(discountedPrice))}
                            </span>
                            {hasDiscount && (
                                <span className="text-sm md:text-md lg:text-xl pl-1 md:pl-2 lg:pl-3 font-normal lg:font-semibold text-gray-400 line-through">
                                    {formatCurrencyVND(Number(price))}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}