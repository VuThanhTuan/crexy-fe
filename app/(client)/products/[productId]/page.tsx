"use client"

import { useParams } from "next/navigation"
import { sampleProducts } from "@/data/products"
import TopBar from "../../_components/top-bar"
import { Footer } from "../../_components/footer"
import { ProductImageGallery } from "./_components/ProductImageGallery"
import { ProductInfo } from "./_components/ProductInfo"
import { ProductDetails } from "./_components/ProductDetails"
import { ProductDescription } from "./_components/ProductDescription"
import { SimilarProducts } from "./_components/SimilarProducts"
import { ProductBreadcrumb } from "./_components/ProductBreadcrumb"

export default function ProductDetailPage() {
    const params = useParams()
    const productId = params.productId as string
    
    // Find product by ID
    const product = sampleProducts.find(p => p.id === productId)
    
    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 overflow-y-auto">
                <TopBar variant="solid" />
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tồn tại</h1>
                        <p className="text-gray-600">Không tìm thấy sản phẩm với ID: {productId}</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    // Create array of images for the gallery
    const productImages = [product.image, product.behindImage]

    return (
        <div className="bg-gray-50 pt-30">
            {/* Header */}
            <TopBar variant="solid" />
            
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <ProductBreadcrumb productName={product.name} />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 pb-16">
                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* Product Images */}
                    <ProductImageGallery
                        images={productImages}
                        productName={product.name}
                    />
                    
                    {/* Product Info */}
                    <ProductInfo product={product} />
                </div>

                {/* Product Details */}
                <div className="mb-16">
                    <ProductDetails />
                </div>

                {/* Product Description */}
                <div className="mb-16">
                    <ProductDescription />
                </div>

                {/* Similar Products */}
                <SimilarProducts 
                    currentProductId={productId}
                />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}
