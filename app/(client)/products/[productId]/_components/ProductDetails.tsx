import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ProductDetailsProps {
    className?: string
}

export const ProductDetails = ({ className }: ProductDetailsProps) => {
    const specifications = [
        { label: "Danh mục", value: "Đồ ngủ" },
        { label: "Phong cách", value: "Cute, Sexy" },
        { label: "Xuất xứ", value: "Việt Nam" },
        { label: "Phân loại", value: "Đồ ngủ" },
        { label: "Chất liệu", value: "100% Cotton" },
    ]

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
                    {specifications.map((spec, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium text-gray-600">
                                {spec.label}
                            </TableCell>
                            <TableCell className="text-gray-900">
                                {spec.value}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
