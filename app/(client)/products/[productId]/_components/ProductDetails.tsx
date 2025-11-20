import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type ProductAttribute = {
    id: string
    name: string
    value: string
}

interface ProductDetailsProps {
    attributes: ProductAttribute[]
    className?: string
}

export const ProductDetails = ({ attributes, className }: ProductDetailsProps) => {
    if (!attributes || attributes.length === 0) {
        return null
    }

    return (
        <div className={className}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">CHI TIẾT SẢN PHẨM</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/3 font-semibold">Thông số</TableHead>
                        <TableHead className="font-semibold">Giá trị</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {attributes.map((attr) => (
                        <TableRow key={attr.id}>
                            <TableCell className="font-medium text-gray-600">
                                {attr.name}
                            </TableCell>
                            <TableCell className="text-gray-900">
                                {attr.value}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
