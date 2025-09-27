"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import Logo from "@/public/images/CrexyLogo.png"

type SearchModalProps = {
    open: boolean
    onClose: () => void
}

export const SearchModal = ({ open, onClose }: SearchModalProps) => {
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            router.push(`/products?searchTerm=${encodeURIComponent(searchTerm.trim())}`)
            onClose()
            setSearchTerm("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch(e)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[900px]! max-w-[900px]! text-crexy-primary rounded-none!">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl text-crexy-primary uppercase">Tìm kiếm sản phẩm</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearch} className="space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Nhập từ khóa tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-9 pr-4 py-2 text-md"
                            autoFocus
                        />
                    </div>

                    <div className="flex text-5xl font-bold justify-center uppercase bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                        Crexy
                    </div>

                    <div className="text-xl pt-[20px] pb-[20px] text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                        Khoác lên bạn sự sáng tạo và quyến rũ, tự tin và năng động.
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SearchModal
