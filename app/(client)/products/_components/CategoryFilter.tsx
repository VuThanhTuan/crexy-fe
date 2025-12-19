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
    onCategoryChange,
    className
}) => {
    return (
        <div className={cn("relative flex items-center justify-center h-40 md:h-50 lg:h-80", className)}>
            <Image src={BG} alt="Background" className="absolute w-full h-full object-cover top-0 left-0 z-0" />
            <div className="z-1 flex flex-wrap gap-3 md:gap-4 justify-center bg-transparent">
                {categories.map((cat) => (
                    <div key={cat.slug}>
                        <Button onClick={() => onCategoryChange(cat.slug)} className="mt-2 uppercase font-bold hidden md:block backdrop-blur-sm" variant="primary_white" size="lg">{cat.slug === "All" ? "Tất cả" : cat.name}</Button>
                        <Button onClick={() => onCategoryChange(cat.slug)} className="mt-2 uppercase font-bold md:hidden backdrop-blur-sm" variant="primary_white" size="sm">{cat.slug === "All" ? "Tất cả" : cat.name}</Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
