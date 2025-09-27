"use client"

import { useParams } from "next/navigation"
import { useMemo } from "react"
import TopBar from "../../_components/top-bar"
import { Footer } from "../../_components/footer"
import { CollectionHeader } from "../_components/CollectionHeader"
import { Product } from "@/components/ProductBox"
import { ProductGrid } from "../../products/_components/ProductGrid"

// Sample data - in real app, this would come from API
const sampleCollections = [
    {
        id: "c1",
        title: "SUMMER'25 COLLECTION",
        subtitle: "The simpler your summer, the sharper your style.",
        image: "/images/List1.jpg",
        description: "Khám phá cảm hứng mùa hè với chất liệu nhẹ và phom dáng tối giản. Bộ sưu tập mang đến những thiết kế thanh lịch, thoải mái và tinh tế cho mùa hè 2025."
    },
    {
        id: "c2", 
        title: "THE FIRST COLLECTION",
        subtitle: "Những thiết kế đầu tiên của Creaxy – tối giản và tinh tế",
        image: "/images/List2.jpg",
        description: "Bộ sưu tập đầu tiên đánh dấu sự khởi đầu của hành trình thời trang tối giản tại Creaxy."
    },
    {
        id: "c3",
        title: "THE LUX COLLECTION", 
        subtitle: "Chất liệu cao cấp, đường cắt sắc nét cho những khoảnh khắc đặc biệt",
        image: "/images/List1.jpg",
        description: "Bộ sưu tập cao cấp với chất liệu tuyệt hảo và thiết kế tinh xảo."
    },
    {
        id: "c4",
        title: "THE SOFT COLLECTION",
        subtitle: "Êm ái, thoáng mát – hoàn hảo cho thời gian thư giãn", 
        image: "/images/List2.jpg",
        description: "Cảm giác êm ái và thoải mái tối đa cho những khoảnh khắc thư giãn."
    },
    {
        id: "c5",
        title: "THE BASIC COLLECTION",
        subtitle: "Các thiết kế cơ bản bền bỉ với thời gian",
        image: "/images/List1.jpg", 
        description: "Những thiết kế cơ bản, đơn giản nhưng không kém phần thanh lịch."
    },
    {
        id: "c6",
        title: "THE NIGHT COLLECTION",
        subtitle: "Phong cách quyến rũ cho những đêm đặc biệt",
        image: "/images/List2.jpg",
        description: "Bộ sưu tập dành cho những buổi tối đặc biệt với phong cách quyến rũ và sang trọng."
    }
]

// Sample products data - in real app, this would come from API
const sampleProducts: Product[] = [
    {
        id: "p1",
        name: "Cream Blouse with Pleats",
        price: 850000,
        image: "/images/products/product1.jpg",
        behindImage: "/images/products/product1-back.jpg",
        description: "Elegant cream blouse with vertical pleats and mandarin collar",
        collectionName: "SUMMER'25 COLLECTION",
        discount: 15
    },
    {
        id: "p2", 
        name: "Navy Wide-Leg Trousers",
        price: 1200000,
        image: "/images/products/product2.jpg",
        behindImage: "/images/products/product2-back.jpg",
        description: "Comfortable navy wide-leg trousers with clean lines",
        collectionName: "SUMMER'25 COLLECTION"
    },
    {
        id: "p3",
        name: "White Collared Shirt",
        price: 750000,
        image: "/images/products/product3.jpg", 
        behindImage: "/images/products/product3-back.jpg",
        description: "Classic white collared shirt with patch pocket",
        collectionName: "SUMMER'25 COLLECTION",
        discount: 10
    },
    {
        id: "p4",
        name: "Brown Sheer Skirt",
        price: 950000,
        image: "/images/products/product4.jpg",
        behindImage: "/images/products/product4-back.jpg", 
        description: "Elegant brown sheer skirt with solid underskirt",
        collectionName: "SUMMER'25 COLLECTION"
    },
    {
        id: "p5",
        name: "Cream Cowl Neck Dress",
        price: 1500000,
        image: "/images/products/product5.jpg",
        behindImage: "/images/products/product5-back.jpg",
        description: "Sophisticated cream dress with elegant draping",
        collectionName: "SUMMER'25 COLLECTION"
    },
    {
        id: "p6",
        name: "Grey Blazer with Tie Belt",
        price: 1800000,
        image: "/images/products/product6.jpg",
        behindImage: "/images/products/product6-back.jpg",
        description: "Structured grey blazer with matching tie belt",
        collectionName: "SUMMER'25 COLLECTION"
    },
    {
        id: "p7",
        name: "Navy Wide-Leg Trousers with Seams",
        price: 1100000,
        image: "/images/products/product7.jpg",
        behindImage: "/images/products/product7-back.jpg",
        description: "Navy trousers with visible vertical seams",
        collectionName: "SUMMER'25 COLLECTION"
    },
    {
        id: "p8",
        name: "Black Sheer Skirt with Overlay",
        price: 900000,
        image: "/images/products/product8.jpg",
        behindImage: "/images/products/product8-back.jpg",
        description: "Black skirt with sheer overlay and solid underlayer",
        collectionName: "SUMMER'25 COLLECTION"
    }
]

export default function CollectionDetailPage() {
    const params = useParams()
    const collectionId = params.collectionId as string

    const collection = useMemo(() => {
        return sampleCollections.find(c => c.id === collectionId)
    }, [collectionId])

    const products = useMemo(() => {
        // In real app, filter products by collection
        return sampleProducts.filter(p => p.collectionName === collection?.title)
    }, [collection])

    if (!collection) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <TopBar variant="solid" />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-crexy-secondary mb-4">Không tìm thấy bộ sưu tập</h1>
                    <p className="text-gray-600">Bộ sưu tập bạn tìm kiếm không tồn tại.</p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <TopBar variant="solid" />

            {/* Collection Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-10">
                    <CollectionHeader collection={collection} />
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-10">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-crexy-secondary mb-2">
                        Sản phẩm trong bộ sưu tập
                    </h2>
                    <p className="text-gray-600">
                        {products.length} sản phẩm
                    </p>
                </div>

                <ProductGrid 
                    products={products} 
                    columns={5}
                    className="gap-6"
                />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}
