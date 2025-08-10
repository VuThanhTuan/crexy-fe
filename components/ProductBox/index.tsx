import Image from "next/image"
import { cn } from "@/lib/utils"

export type Product = {
    id: string
    name: string
    price: number
    image: string
    description: string
    collectionName: string
    discount?: number
}

type ProductBoxProps = {
    className?: string
    product: Product
}

export const ProductBox = ({ className, product }: ProductBoxProps) => {
    const { name, price, image, collectionName, discount } = product

    const hasDiscount = typeof discount === "number" && discount > 0
    const discountedPrice = hasDiscount ? Math.round(price * (1 - (discount as number) / 100)) : null

    const formatCurrencyVND = (value: number) =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 })

    return (
        <div
            className={cn(
                "relative w-[340px] md:w-[360px] h-[600px] overflow-hidden border-b-2 border-crexy-secondary bg-white",
                className,
            )}
        >
            <div className="relative h-[78%] w-full">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 340px, 360px"
                />

                {hasDiscount && (
                    <div className="absolute left-0 top-0 bg-orange-500 px-3 py-1 text-xs font-extrabold text-white">
                        -{discount}%
                    </div>
                )}
            </div>

            <div className="flex h-[22%] w-full flex-col items-center justify-between bg-white px-5 pb-5 pt-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                    {collectionName}
                </p>
                <h3 className="mt-1 line-clamp-2 max-w-[90%] text-xl font-extrabold leading-tight text-crexy-secondary">
                    {name}
                </h3>

                <div className="mt-2 flex w-full items-center justify-between px-2">
                    {hasDiscount ? (
                        <>
                            <span className="text-base font-extrabold text-crexy-secondary">
                                {formatCurrencyVND(discountedPrice as number)}
                            </span>
                            <span className="text-sm font-semibold text-gray-400 line-through">
                                {formatCurrencyVND(price)}
                            </span>
                        </>
                    ) : (
                        <span className="mx-auto text-base font-extrabold text-crexy-secondary">
                            {formatCurrencyVND(price)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}