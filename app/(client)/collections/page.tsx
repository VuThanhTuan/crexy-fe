"use client"

import { useMemo, useState } from "react"
import TopBar from "../_components/top-bar"
import { Footer } from "../_components/footer"
import { Pagination } from "../products/_components/Pagination"
import Image from "next/image"
import Link from "next/link"

type Collection = {
    id: string
    title: string
    subtitle?: string
    image: string
    href?: string
}

const ITEMS_PER_PAGE = 4

const sampleCollections: Collection[] = [
    {
        id: "c1",
        title: "SUMMER'25 COLLECTION",
        subtitle: "Khám phá cảm hứng mùa hè với chất liệu nhẹ và phom dáng tối giản",
        image: "/images/List1.jpg",
        href: "/products"
    },
    {
        id: "c2",
        title: "THE FIRST COLLECTION",
        subtitle: "Những thiết kế đầu tiên của Creaxy – tối giản và tinh tế",
        image: "/images/List2.jpg",
        href: "/products"
    },
    {
        id: "c3",
        title: "THE LUX COLLECTION",
        subtitle: "Chất liệu cao cấp, đường cắt sắc nét cho những khoảnh khắc đặc biệt",
        image: "/images/List1.jpg",
        href: "/products"
    },
    {
        id: "c4",
        title: "THE SOFT COLLECTION",
        subtitle: "Êm ái, thoáng mát – hoàn hảo cho thời gian thư giãn",
        image: "/images/List2.jpg",
        href: "/products"
    },
    {
        id: "c5",
        title: "THE BASIC COLLECTION",
        subtitle: "Các thiết kế cơ bản bền bỉ với thời gian",
        image: "/images/List1.jpg",
        href: "/products"
    },
    {
        id: "c6",
        title: "THE NIGHT COLLECTION",
        subtitle: "Mềm mại và quyến rũ cho những buổi tối dịu êm",
        image: "/images/List2.jpg",
        href: "/products"
    }
]

export default function CollectionsPage() {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(sampleCollections.length / ITEMS_PER_PAGE)

    const paginatedCollections = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE
        return sampleCollections.slice(start, end)
    }, [currentPage])

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
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
                <div className="flex flex-col gap-12">
                    {paginatedCollections.map((c) => (
                        <div key={c.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-md bg-gray-100">
                                <Image
                                    src={c.image}
                                    alt={c.title}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    priority={false}
                                />
                            </div>
                            <div className="flex flex-col items-start md:items-start justify-center">
                                <h2 className="text-xl md:text-3xl font-bold text-crexy-secondary tracking-wide mb-3">{c.title}</h2>
                                {c.subtitle && (
                                    <p className="text-gray-600 mb-6 max-w-prose">
                                        {c.subtitle}
                                    </p>
                                )}
                                <Link href={`/collections/${c.id}`} className="inline-block">
                                    <span className="px-5 py-2.5 bg-crexy-primary text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity">
                                        Xem bộ sưu tập
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

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

            {/* Footer */}
            <Footer />
        </div>
    )
}


