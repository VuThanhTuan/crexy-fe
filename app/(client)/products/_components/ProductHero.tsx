"use client"
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
        <div className={cn("relative h-26 lg:h-96 w-full overflow-hidden bg-cover bg-center", className)} style={{ backgroundImage: `url(${backgroundImage})` }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <h1 className="text-5xl font-bold text-white text-center drop-shadow-lg uppercase">
                    {title}
                </h1>
            </div>
        </div>
    )
}
