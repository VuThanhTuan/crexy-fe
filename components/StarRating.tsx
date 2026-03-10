import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface StarRatingProps {
    rating: number
    maxRating?: number
    size?: "sm" | "md" | "lg"
    className?: string
    showNumber?: boolean
}

export const StarRating = ({ 
    rating, 
    maxRating = 5, 
    size = "md", 
    className,
    showNumber = false 
}: StarRatingProps) => {
    const sizeClasses = {
        sm: "w-3 h-3",
        md: "w-4 h-4", 
        lg: "w-5 h-5"
    }

    const stars = Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= rating

        return (
            <Star
                key={index}
                className={cn(
                    sizeClasses[size],
                    isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                    className
                )}
            />
        )
    })

    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {stars}
            </div>
            {showNumber && (
                <span className="ml-1 text-sm text-gray-600">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    )
}
