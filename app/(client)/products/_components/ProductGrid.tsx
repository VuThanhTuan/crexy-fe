"use client"
import { ProductBox, Product } from "@/components/ProductBox"
import { cn } from "@/lib/utils"

interface ProductGridProps {
    products: Product[]
    className?: string
}

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    className,
}) => {

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
            </div>
        )
    }

    return (
        <div className={cn("grid md:gap-1 lg:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4", className)}>
            {products.map((product, index) => (
                <ProductBox
                    key={index}
                    product={product}
                    width="w-[300px]"
                    height="h-[400px]"
                    className="w-full h-[350px] md:h-[400px] lg:h-[500px]"
                />
            ))}
        </div>
    )
}
