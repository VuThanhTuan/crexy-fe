import Image from "next/image"

interface ProductDescriptionProps {
    className?: string
}

export const ProductDescription = ({ className }: ProductDescriptionProps) => {
    return (
        <div className={className}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">MÔ TẢ SẢN PHẨM</h2>
            
            <div className="space-y-6">
                <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Đặc điểm nổi bật</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>• <strong>Chất liệu:</strong> 100% Polyester, Mesh knit, thoáng khí, 155gsm nhẹ nhàng</li>
                        <li>• <strong>Nhà cung cấp:</strong> Nhà cung cấp vải hàng đầu thế giới trong dệt may thể thao; nhà cung cấp chính cho Adidas, Nike</li>
                        <li>• <strong>Công nghệ hoàn thiện vải:</strong> Quickdry (khô nhanh) và Wicking (thấm hút nhanh). Tính năng khử mùi tự nhiên</li>
                        <li>• Không nhăn và mang lại cảm giác mát mẻ trong hoạt động</li>
                        <li>• Tự hào sản xuất tại Việt Nam</li>
                        <li>• <strong>Model:</strong> 1m84 - 73kg, Mặc XL</li>
                    </ul>
                </div>

                {/* Additional Product Images */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src="/images/List1.jpg"
                            alt="Product detail view"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src="/images/List2.jpg"
                            alt="Product close-up view"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
