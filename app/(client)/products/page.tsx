"use client"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CategoryFilter } from "./_components/CategoryFilter"
import { useCategoryStore } from "@/hooks/use-category-store"
import { SearchAndFilter } from "./_components/SearchAndFilter"
import { ProductGrid } from "./_components/ProductGrid"
import { Pagination } from "./_components/Pagination"
import { getPublicApi } from "@/common/axios"
import type { PaginatedProductResponse } from "@/types/product"
import { Product } from "@/components/ProductBox"

const ITEMS_PER_PAGE = 15

function ProductsPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Init state from URL
    const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All")
    const [searchInput, setSearchInput] = useState(searchParams.get("search") || "")
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt")
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">((searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC")

    // Fetch categories from store (API)
    const categoriesData = useCategoryStore((s) => s.categories)
    const fetchCategories = useCategoryStore((s) => s.fetchCategories)

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])


    // State for products and loading
    const [products, setProducts] = useState<import("@/components/ProductBox").Product[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const client = getPublicApi()
                const params: Record<string, unknown> = {
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                    sortBy,
                    sortOrder,
                }
                if (activeCategory !== "All") {
                    // Find category by slug
                    const cat = (categoriesData || []).find((c) => c.slug === activeCategory)
                    if (cat) params.categoryId = cat.id
                }
                if (searchQuery.trim()) {
                    params.search = searchQuery.trim()
                }
                const res = await client.get<PaginatedProductResponse>("/products", { params })
                console.log('API Response:', res.data.data?.[0]); // Debug log
                // Map API product to ProductBox type
                const mapped = (res.data.data || []).map((p) => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.primaryImage?.url || "/images/placeholder.png",
                    behindImage: p.productMedia?.[1]?.media?.url || p.primaryImage?.url || "/images/placeholder.png",
                    description: p.description || "",
                    collectionName: p.category?.name || "",
                    discount: p.discount?.discountValue || undefined,
                    productVariants: p.productVariants,
                } as Product))
                setProducts(mapped)
                setTotalPages(res.data.totalPages)
            } catch {
                setProducts([])
                setTotalPages(1)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [activeCategory, searchQuery, currentPage, categoriesData, sortBy, sortOrder])

    const handleCategoryChange = (slug: string) => {
        setActiveCategory(slug)
        setCurrentPage(1)
        const params = new URLSearchParams(window.location.search)
        params.set("category", slug)
        params.set("page", "1")
        router.replace(`?${params.toString()}`)
    }

    // Debounced handler for search
    // Debounce search input to trigger API
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchQuery(searchInput)
            setCurrentPage(1)
            const params = new URLSearchParams(window.location.search)
            params.set("search", searchInput)
            params.set("page", "1")
            router.replace(`?${params.toString()}`)
        }, 300)
        return () => clearTimeout(handler)
    }, [searchInput])

    const handleSearchChange = (query: string) => {
        setSearchInput(query)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        const params = new URLSearchParams(window.location.search)
        params.set("page", String(page))
        router.replace(`?${params.toString()}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSortChange = (newSortBy: string, newSortOrder: string) => {
        setSortBy(newSortBy)
        setSortOrder(newSortOrder as "ASC" | "DESC")
        setCurrentPage(1)
        const params = new URLSearchParams(window.location.search)
        params.set("sortBy", newSortBy)
        params.set("sortOrder", newSortOrder)
        params.set("page", "1")
        router.replace(`?${params.toString()}`)
    }

    // Sync state with URL on popstate (browser back/forward)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        setActiveCategory(params.get("category") || "All")
        setSearchInput(params.get("search") || "")
        setSearchQuery(params.get("search") || "")
        setCurrentPage(Number(params.get("page")) || 1)
        setSortBy(params.get("sortBy") || "createdAt")
        setSortOrder((params.get("sortOrder") as "ASC" | "DESC") || "DESC")
    }, [searchParams])

    // Build categories list for filter (show "All" + top-level categories)
    const filterCategories = [
        { slug: "All", name: "Tất cả" },
        ...((categoriesData || []).filter((c) => !c.parentId).map((c) => ({ slug: c.slug || "", name: c.name })))
    ]

    return (
        <div className="bg-gray-50 pt-14 md:pt-16 lg:pt-20">
            {/* Category Filter */}
            <div className="bg-white py-2 md:py-4 lg:py-8 pb-0">
                <div className="container mx-auto px-4">
                    <CategoryFilter
                        categories={filterCategories}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white py-2 md:py-4 lg:py-6 border-b">
                <div className="container mx-auto px-4">
                    <SearchAndFilter
                        searchValue={searchInput}
                        onSearchChange={handleSearchChange}
                        onSortChange={handleSortChange}
                    />
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto md:px-4 md:py-12">
                <ProductGrid
                    products={products}
                />
                {loading && (
                    <div className="text-center py-8 text-gray-500">Đang tải sản phẩm...</div>
                )}
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
        </div>
    )
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <ProductsPageContent />
        </Suspense>
    )
}
