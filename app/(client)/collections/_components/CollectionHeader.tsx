"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type Collection = {
    id: string
    title: string
    subtitle?: string
    image: string
    description?: string
}

type CollectionHeaderProps = {
    collection: Collection
    className?: string
}

export const CollectionHeader = ({ collection, className }: CollectionHeaderProps) => {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 items-center", className)}>
            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-md bg-gray-100">
                <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority={true}
                />
            </div>
            <div className="flex flex-col items-start md:items-start justify-center">
                <h1 className="text-2xl md:text-4xl font-bold text-crexy-secondary tracking-wide mb-3">
                    {collection.title}
                </h1>
                {collection.subtitle && (
                    <p className="text-gray-600 mb-4 max-w-prose text-lg">
                        {collection.subtitle}
                    </p>
                )}
                {collection.description && (
                    <p className="text-gray-700 mb-6 max-w-prose leading-relaxed">
                        {collection.description}
                    </p>
                )}
            </div>
        </div>
    )
}
