"use client"
import { cn } from "@/lib/utils"
// import { motion } from "framer-motion"
import BG from "@/public//images/Creaxy-Bg2.jpeg"
import Image from "next/image"
import { Button } from "@/components/ui/button"

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
        <div className={cn("relative flex items-center justify-center h-40 md:h-50 lg:h-80", className)}>
            <Image src={BG} alt="Background" className="absolute w-full h-full object-cover top-0 left-0 z-0" />
            <div className="z-1 flex flex-wrap gap-3 md:gap-4 justify-center bg-transparent">
                {categories.map((cat) => (
                    // <motion.button
                    //     key={cat.slug}
                    //     onClick={() => onCategoryChange(cat.slug)}
                    //     className={cn(
                    //         "px-4 py-2 md:px-6 md:py-3 text-sm font-medium transition-all duration-300 uppercase tracking-wide",
                    //         activeCategory === cat.slug
                    //             ? "bg-white text-crexy-primary border-2 border-crexy-primary"
                    //             : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
                    //     )}
                    //     whileHover={{ scale: 1.05 }}
                    //     whileTap={{ scale: 0.95 }}
                    // >
                    //     {cat.slug === "All" ? "Tất cả" : cat.name}
                    // </motion.button>
                    <>
                        <Button key={cat.slug} onClick={() => onCategoryChange(cat.slug)} className="mt-2 uppercase font-bold hidden md:block backdrop-blur-sm" variant="primary_white" size="lg">{cat.slug === "All" ? "Tất cả" : cat.name}</Button>
                        <Button key={cat.slug} onClick={() => onCategoryChange(cat.slug)} className="mt-2 uppercase font-bold md:hidden backdrop-blur-sm" variant="primary_white" size="sm">{cat.slug === "All" ? "Tất cả" : cat.name}</Button>
                    </>
                ))}
            </div>
        </div>
    )
}
