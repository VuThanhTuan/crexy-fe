"use client"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CategoryItem {
    slug: string;
    name: string;
}
interface CategoryFilterProps {
    categories: CategoryItem[];
    activeCategory: string;
    onCategoryChange: (slug: string) => void;
    className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
    className
}) => {
    return (
        <div className={cn("flex gap-4 justify-center", className)}>
            {categories.map((cat) => (
                <motion.button
                    key={cat.slug}
                    onClick={() => onCategoryChange(cat.slug)}
                    className={cn(
                        "px-6 py-3 text-sm font-medium transition-all duration-300 uppercase tracking-wide",
                        activeCategory === cat.slug
                            ? "bg-white text-crexy-primary border-2 border-crexy-primary"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {cat.slug === "All" ? "Tất cả" : cat.name}
                </motion.button>
            ))}
        </div>
    )
}
