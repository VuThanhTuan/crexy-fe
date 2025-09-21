"use client"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CategoryFilterProps {
    categories: string[]
    activeCategory: string
    onCategoryChange: (category: string) => void
    className?: string
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
    className
}) => {
    return (
        <div className={cn("flex gap-4 justify-center", className)}>
            {categories.map((category) => (
                <motion.button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={cn(
                        "px-6 py-3 text-sm font-medium transition-all duration-300 uppercase tracking-wide",
                        activeCategory === category
                            ? "bg-white text-crexy-primary border-2 border-crexy-primary"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {category}
                </motion.button>
            ))}
        </div>
    )
}
