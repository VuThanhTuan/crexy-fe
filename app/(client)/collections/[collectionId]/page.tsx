"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import TopBar from "../../_components/top-bar"
import { Footer } from "../../_components/footer"
import { CollectionHeader } from "../_components/CollectionHeader"
import { Product } from "@/components/ProductBox"
import { ProductGrid } from "../../products/_components/ProductGrid"
import { fetchCollectionBySlug } from "@/services/collections.service"
import type { Collection, ProductInCollection } from "@/types/collection"

// Helper function to map API product to Product type
function mapProductInCollectionToProduct(apiProduct: ProductInCollection): Product {
    const primaryImageUrl = apiProduct.primaryImage?.url || "/images/List1.jpg"

    return {
        id: apiProduct.id,
        name: apiProduct.name,
        price: apiProduct.price || 0,
        image: primaryImageUrl,
        behindImage: primaryImageUrl, // API không có behind image, dùng primary
        description: "",
        collectionName: "",
        productVariants: []
    }
}

export default function CollectionDetailPage() {
    const params = useParams()
    const collectionSlug = params.collectionId as string

    const [collection, setCollection] = useState<Collection | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadCollection = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await fetchCollectionBySlug(collectionSlug)
                setCollection(data)

                // Map products from API to Product type
                const mappedProducts = (data.products || []).map(mapProductInCollectionToProduct)
                setProducts(mappedProducts)
            } catch (err) {
                console.error('Failed to load collection:', err)
                setError('Không thể tải thông tin bộ sưu tập')
            } finally {
                setLoading(false)
            }
        }

        loadCollection()
    }, [collectionSlug])

    if (loading) {
        return (
            <div className="bg-gray-50 pt-30 min-h-screen">
                <TopBar variant="solid" />
                <div className="container mx-auto px-4 py-20">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crexy-primary mx-auto mb-4"></div>
                            <p className="text-gray-600">Đang tải...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !collection) {
        return (
            <div className="bg-gray-50 pt-30 min-h-screen">
                <TopBar variant="solid" />
                <div className="container mx-auto px-4 py-20">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-crexy-secondary mb-4">
                                {error || 'Không tìm thấy bộ sưu tập'}
                            </h1>
                            <p className="text-gray-600 mb-6">
                                {error ? 'Vui lòng thử lại sau' : 'Bộ sưu tập bạn tìm kiếm không tồn tại'}
                            </p>
                            <button
                                onClick={() => window.history.back()}
                                className="px-5 py-2.5 bg-crexy-primary text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
                            >
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Map collection data for CollectionHeader component
    const collectionForHeader = {
        id: collection.id,
        title: collection.name,
        subtitle: collection.description?.substring(0, 100) || "",
        image: collection.media?.url || "/images/List1.jpg",
        description: collection.description || ""
    }

    if (!collection) {
        return (
            <div className="bg-gray-50 pt-14 md:pt-16 lg:pt-20">
                <TopBar variant="solid" />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-crexy-secondary mb-4">Không tìm thấy bộ sưu tập</h1>
                    <p className="text-gray-600">Bộ sưu tập bạn tìm kiếm không tồn tại.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 pt-14 md:pt-16 lg:pt-20">
            {/* Header */}
            <TopBar variant="solid" />

            {/* Collection Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-10">
                    <CollectionHeader collection={collectionForHeader} />
                </div>
            </div>


            {/* Products Grid */}
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-crexy-secondary mb-2">
                        Sản phẩm trong bộ sưu tập
                    </h2>
                    <p className="text-gray-600">
                        {collection.productCount} sản phẩm
                    </p>
                </div>
            </div>
            <div className="container mx-auto md:px-4 md:py-12">
                <ProductGrid
                    products={products}
                />
            </div>
        </div>
    )
}
