"use client"

import { ProductBox, Product } from "@/components/ProductBox"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { sampleProducts } from "@/data/products"

interface SimilarProductsProps {
    currentProductId: string
    className?: string
}

export const SimilarProducts = ({ currentProductId, className }: SimilarProductsProps) => {
    // Filter out current product and get similar products
    const similarProducts = sampleProducts
        .filter(product => product.id !== currentProductId)
        .slice(0, 5)

    return (
        <div className={className}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">SẢN PHẨM TƯƠNG TỰ</h2>
            
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {similarProducts.map((product) => (
                        <CarouselItem key={product.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                            <ProductBox
                                product={product}
                                width="w-full"
                                height="h-[500px]"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>
        </div>
    )
}
