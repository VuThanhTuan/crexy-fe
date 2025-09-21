"use client"
import { ProductBox, Product } from "@/components/ProductBox"
import { cn } from "@/lib/utils"

interface ProductGridProps {
    products: Product[]
    className?: string
    columns?: 3 | 4 | 5
}

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    className,
    columns = 5
}) => {
    const getGridCols = () => {
        switch (columns) {
            case 3:
                return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            case 4:
                return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            case 5:
                return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            default:
                return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        }
    }

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
        <div className={cn("grid gap-4", getGridCols(), className)}>
            {products.map((product) => (
                <ProductBox
                    key={product.id}
                    product={product}
                    width="w-[300px]"
                    height="h-[500px]"
                />
            ))}
        </div>
    )
}
