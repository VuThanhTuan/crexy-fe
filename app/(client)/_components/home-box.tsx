


export const HomeBox: React.FC = () => {
    return (
        <div className="p-3 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-pink-300 to-crexy-tertiary opacity-75 z-10"></div>
            <div className="bg-gray-100 p-8 border-2 border-crexy-primary relative z-20">
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