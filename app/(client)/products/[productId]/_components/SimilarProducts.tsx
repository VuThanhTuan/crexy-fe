"use client"

import { Product } from "@/components/ProductBox"
import { ProductGrid } from "../../_components/ProductGrid"

interface SimilarProductsProps {
    products: Product[]
    className?: string
}

export const SimilarProducts = ({ products, className }: SimilarProductsProps) => {
    return (
        <div className={className}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 px-4">SẢN PHẨM TƯƠNG TỰ</h2>

            {/* <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="lg:-ml-4">
                    {products.map((product, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <ProductBox
                                product={product}
                                width="w-full"
                                height="h-[500px]"
                                className="w-full h-[350px] md:h-[400px] lg:h-[500px]"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel> */}
            <ProductGrid
                products={products}
            />
        </div>
    )
}
