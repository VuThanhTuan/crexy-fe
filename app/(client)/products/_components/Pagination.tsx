"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className
}) => {
    const getVisiblePages = () => {
        const delta = 2
        const range = []
        const rangeWithDots = []

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...")
        } else {
            rangeWithDots.push(1)
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages)
        } else {
            rangeWithDots.push(totalPages)
        }

        return rangeWithDots
    }

    if (totalPages <= 1) return null

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            {/* Previous Button */}
            <motion.button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                    currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:text-crexy-primary hover:bg-gray-100"
                )}
                whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
            >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
            </motion.button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getVisiblePages().map((page, index) => (
                    <div key={index}>
                        {page === "..." ? (
                            <span className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                            <motion.button
                                onClick={() => onPageChange(page as number)}
                                className={cn(
                                    "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                                    currentPage === page
                                        ? "bg-crexy-primary text-white"
                                        : "text-gray-700 hover:text-crexy-primary hover:bg-gray-100"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {page}
                            </motion.button>
                        )}
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <motion.button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                    currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:text-crexy-primary hover:bg-gray-100"
                )}
                whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
            >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
            </motion.button>
        </div>
    )
}
