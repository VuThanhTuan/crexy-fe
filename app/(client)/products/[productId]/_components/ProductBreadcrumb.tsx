import { CartBreadcrumb } from "@/components/CartBreadcrumb"

interface ProductBreadcrumbProps {
    productName: string
    className?: string
}

export const ProductBreadcrumb = ({ productName, className }: ProductBreadcrumbProps) => {
    return (
        <CartBreadcrumb
            className={className}
            items={[
                { label: "Trang chủ", href: "/", showHomeIcon: true },
                { label: "Sản phẩm", href: "/products" },
                { label: productName },
            ]}
        />
    )
}
