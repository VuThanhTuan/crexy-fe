interface ProductDescriptionProps {
    description: string
    className?: string
}

export const ProductDescription = ({ description, className }: ProductDescriptionProps) => {
    if (!description) {
        return null
    }

    return (
        <div className={className}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">MÔ TẢ SẢN PHẨM</h2>
            
            <div className="prose max-w-none">
                <div 
                    className="text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
        </div>
    )
}
