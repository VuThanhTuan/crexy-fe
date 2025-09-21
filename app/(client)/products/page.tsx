"use client"
import { useState, useMemo } from "react"
import TopBar from "../_components/top-bar"
import { CategoryFilter } from "./_components/CategoryFilter"
import { SearchAndFilter } from "./_components/SearchAndFilter"
import { ProductGrid } from "./_components/ProductGrid"
import { Pagination } from "./_components/Pagination"
import { ProductHero } from "./_components/ProductHero"
import { Footer } from "../_components/footer"
import { sampleProducts, categories } from "@/data/products"

const ITEMS_PER_PAGE = 15

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    // Filter products based on category and search query
    const filteredProducts = useMemo(() => {
        let filtered = sampleProducts

        // Filter by category
        if (activeCategory !== "All") {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
                product.description.toLowerCase().includes(activeCategory.toLowerCase())
            )
        }

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.collectionName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        return filtered
    }, [activeCategory, searchQuery])

    // Paginate products
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        const endIndex = startIndex + ITEMS_PER_PAGE
        return filteredProducts.slice(startIndex, endIndex)
    }, [filteredProducts, currentPage])

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category)
        setCurrentPage(1) // Reset to first page when changing category
    }

    const handleSearchChange = (query: string) => {
        setSearchQuery(query)
        setCurrentPage(1) // Reset to first page when searching
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Scroll to top when changing pages
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="products-page min-h-screen bg-gray-50">
            {/* Header */}
            <TopBar variant="solid" />
            
            {/* Category Filter */}
            <div className="bg-white py-8">
                <div className="container mx-auto px-4">
                    <CategoryFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>
            </div>

            {/* Hero Section */}
            <ProductHero
                backgroundImage="/images/Creaxy-Bg.png"
                title={activeCategory === "All" ? "Tất cả sản phẩm" : activeCategory}
            />

            {/* Search and Filter */}
            <div className="bg-white py-6 border-b">
                <div className="container mx-auto px-4">
                    <SearchAndFilter
                        searchValue={searchQuery}
                        onSearchChange={handleSearchChange}
                        onFilterClick={() => console.log("Filter clicked")}
                        onSortClick={() => console.log("Sort clicked")}
                    />
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-12">
                <ProductGrid
                    products={paginatedProducts}
                    columns={5}
                />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="bg-white py-8 border-t">
                    <div className="container mx-auto px-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    )
}
