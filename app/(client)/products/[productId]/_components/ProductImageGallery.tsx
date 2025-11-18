"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface ProductImageGalleryProps {
    images: string[]
    productName: string
    className?: string
}

export const ProductImageGallery = ({ 
    images, 
    productName, 
    className 
}: ProductImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <div className={cn("space-y-4", className)}>
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                    src={images[selectedImage]}
                    alt={`${productName} - Image ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
            </div>

            {/* Carousel */}
            {images.length > 1 && (
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {images.map((image, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/4">
                                <div 
                                    className={cn(
                                        "relative aspect-square w-full overflow-hidden rounded-md cursor-pointer border-2 transition-all",
                                        selectedImage === index 
                                            ? "border-crexy-primary" 
                                            : "border-transparent hover:border-gray-300"
                                    )}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${productName} - Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 25vw, 10vw"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-1" />
                    <CarouselNext className="right-1" />
                </Carousel>
            )}
        </div>
    )
}
