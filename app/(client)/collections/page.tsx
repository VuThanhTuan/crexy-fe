"use client"

import { useEffect, useState } from "react"
import TopBar from "../_components/top-bar"
import { Pagination } from "../products/_components/Pagination"
import Image from "next/image"
import Link from "next/link"
import { fetchCollections } from "@/services/collections.service"
import type { Collection } from "@/types/collection"

const ITEMS_PER_PAGE = 10

export default function CollectionsPage() {
    const [collections, setCollections] = useState<Collection[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadCollections = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetchCollections({
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                    sortBy: 'createdAt',
                    sortOrder: 'DESC'
                })
                setCollections(response.data)
                setTotalPages(response.totalPages)
            } catch (err) {
                console.error('Failed to load collections:', err)
                setError('Không thể tải danh sách bộ sưu tập')
            } finally {
                setLoading(false)
            }
        }
        
        loadCollections()
    }, [currentPage])

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (loading) {
        return (
            <div className="bg-gray-50 pt-20 min-h-screen">
                <TopBar variant="solid" />
                <div className="bg-white border-b">
                    <div className="container mx-auto px-4 py-6">
                        <h1 className="text-2xl font-extrabold text-crexy-secondary">BỘ SƯU TẬP</h1>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-10">
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

    if (error) {
        return (
            <div className="bg-gray-50 pt-12 md:pt-16 lg:pt-20 min-h-screen">
                <TopBar variant="solid" />
                <div className="bg-white border-b">
                    <div className="container mx-auto px-4 py-6">
                        <h1 className="text-2xl font-extrabold text-crexy-secondary">BỘ SƯU TẬP</h1>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-10">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-5 py-2.5 bg-crexy-primary text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
                            >
                                Thử lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 pt-20">
            {/* Header */}
            <TopBar variant="solid" />

            {/* Title */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-2xl font-extrabold text-crexy-secondary">BỘ SƯU TẬP</h1>
                </div>
            </div>

            {/* Collections List */}
            <div className="container mx-auto px-4 py-10">
                {collections.length === 0 ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <p className="text-gray-600 mb-4">Chưa có bộ sưu tập nào</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-12">
                        {collections.map((c) => (
                            <div key={c.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-md bg-gray-100">
                                    <Image
                                        src={c.media?.url || "/images/List1.jpg"}
                                        alt={c.name}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                        priority={false}
                                    />
                                </div>
                                <div className="flex flex-col items-start md:items-start justify-center">
                                    <h2 className="text-xl md:text-3xl font-bold text-crexy-secondary tracking-wide mb-3">
                                        {c.name}
                                    </h2>
                                    {c.description && (
                                        <p className="text-gray-600 mb-6 max-w-prose">
                                            {c.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-sm text-gray-500">
                                            {c.productCount} sản phẩm
                                        </span>
                                    </div>
                                    <Link href={`/collections/${c.slug || c.id}`} className="inline-block">
                                        <span className="px-5 py-2.5 bg-crexy-primary text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity">
                                            Xem bộ sưu tập
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}


