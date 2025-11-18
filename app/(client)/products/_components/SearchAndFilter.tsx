"use client"
import { Search, Filter, SortAscIcon } from "lucide-react"
import * as HoverCard from "@radix-ui/react-hover-card"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SearchAndFilterProps {
    searchValue: string
    onSearchChange: (value: string) => void
    onFilterClick?: () => void
    onSortChange?: (sortBy: string, sortOrder: string) => void
    className?: string
    placeholder?: string
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    searchValue,
    onSearchChange,
    // onFilterClick,
    onSortChange,
    className,
    placeholder = "Tìm kiếm sản phẩm..."
}) => {
    const [isFocused, setIsFocused] = useState(false)

    const sortOptions = [
        { label: "Mới nhất", sortBy: "createdAt", sortOrder: "DESC" },
        { label: "Giá từ thấp đến cao", sortBy: "price", sortOrder: "ASC" },
        { label: "Giá từ cao đến thấp", sortBy: "price", sortOrder: "DESC" },
    ]

    const handleSortSelect = (sortBy: string, sortOrder: string) => {
        onSortChange?.(sortBy, sortOrder)
    }

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
                {/* Sort Dropdown with HoverCard */}
                <HoverCard.Root openDelay={0} closeDelay={100}>
                    <HoverCard.Trigger asChild>
                        <button
                            className="p-3 border-2 border-gray-200 rounded-lg hover:border-crexy-primary hover:text-crexy-primary transition-all duration-300"
                            title="Sort"
                        >
                            <SortAscIcon className="w-5 h-5" />
                        </button>
                    </HoverCard.Trigger>
                    <HoverCard.Content
                        side="bottom"
                        align="end"
                        className="z-50 mt-2 w-[200px] bg-white border-2 border-gray-200 rounded-lg shadow-lg"
                    >
                        {sortOptions.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleSortSelect(option.sortBy, option.sortOrder)}
                                className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                                {option.label}
                            </button>
                        ))}
                    </HoverCard.Content>
                </HoverCard.Root>
            </div>
        </div>
    )
}
