"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductHeroProps {
    backgroundImage: string
    title: string
    className?: string
}

export const ProductHero: React.FC<ProductHeroProps> = ({
    backgroundImage,
    title,
    className
}) => {
    return (
        <div className={cn("relative h-96 w-full overflow-hidden", className)}>
            {/* Background Image */}
            <Image
                src={backgroundImage}
                alt={title}
                fill
                className="object-cover w-full h-full"
                priority
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <h1 className="text-5xl font-bold text-white text-center drop-shadow-lg">
                    {title}
                </h1>
            </div>
        </div>
    )
}
