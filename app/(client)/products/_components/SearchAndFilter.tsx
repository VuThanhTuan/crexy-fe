"use client"
import { Search, Filter, Grid3X3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SearchAndFilterProps {
    searchValue: string
    onSearchChange: (value: string) => void
    onFilterClick?: () => void
    onSortClick?: () => void
    className?: string
    placeholder?: string
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    searchValue,
    onSearchChange,
    onFilterClick,
    onSortClick,
    className,
    placeholder = "Tìm kiếm sản phẩm..."
}) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={cn("flex items-center gap-4 w-full max-w-4xl mx-auto", className)}>
            {/* Search Input */}
            <div className="relative flex-1">
                <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                />
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={cn(
                        "w-full pl-10 pr-4 py-3 border-2 rounded-lg transition-all duration-300 focus:outline-none",
                        isFocused 
                            ? "border-crexy-primary shadow-lg" 
                            : "border-gray-200 hover:border-gray-300"
                    )}
                />
            </div>

            {/* Filter and Sort Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={onFilterClick}
                    className="p-3 border-2 border-gray-200 rounded-lg hover:border-crexy-primary hover:text-crexy-primary transition-all duration-300"
                    title="Filter"
                >
                    <Filter className="w-5 h-5" />
                </button>
                <button
                    onClick={onSortClick}
                    className="p-3 border-2 border-gray-200 rounded-lg hover:border-crexy-primary hover:text-crexy-primary transition-all duration-300"
                    title="Sort"
                >
                    <Grid3X3 className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
