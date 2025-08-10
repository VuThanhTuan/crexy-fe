


export const HomeBox: React.FC = () => {
    return (
        <div className="bg-white p-3">
            <div className="bg-gray-100 p-8 border-2 border-crexy-primary">
                {/* Business Name */}
                <h1 className="text-3xl font-bold text-crexy-primary text-center mb-4">
                    CREXY
                </h1>

                {/* Address */}
                <p className="text-crexy-primary text-center mb-4">
                    336 Đường 2/9 P. Hòa Cường TP. Đà Nẵng
                </p>

                {/* Separator Line */}
                <div className="w-full h-px bg-crexy-primary mb-4"></div>

                {/* Operating Hours Header */}
                <h2 className="text-xl font-semibold text-crexy-primary text-center mb-3">
                    THỜI GIAN HOẠT ĐỘNG
                </h2>

                {/* Operating Hours */}
                <div className="text-crexy-primary text-center space-y-1">
                    <p>Giờ mở của: 6h</p>
                    <p>Giờ đóng cửa: 22h</p>
                </div>
            </div>
        </div>

    )
}