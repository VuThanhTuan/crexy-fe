"use client"
import * as React from "react"
import Link from "next/link"
import { Search, ShoppingBag, UserRound } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image, { StaticImageData } from "next/image"
import Logo from "@/public/images/CrexyLogo.png" // Adjust the path to your logo image
import CuteClothes from "@/public/images/List2.jpg"
import SleepWear from "@/public/images/List1.jpg"
import SwimWear from "@/public/images/List5.jpg"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"

interface TopBarProps {
    variant?: 'default' | 'transparent' | 'solid'
    className?: string
}

const TopBar: React.FC<TopBarProps> = ({ variant = 'default', className = '' }) => {

    const [productCategoryImage, setProductCategoryImage] = useState<StaticImageData>(CuteClothes);

    const onHoverCuteClothes = () => {
        setProductCategoryImage(CuteClothes);
    }

    const onHoverSleepWear = () => {
        setProductCategoryImage(SleepWear);
    }

    const onHoverSwimWear = () => {
        setProductCategoryImage(SwimWear);
    }

    const getVariantStyles = () => {
        switch (variant) {
            case 'transparent':
                return 'bg-transparent absolute top-0 left-0 right-0'
            case 'solid':
                return 'bg-white shadow-sm'
            default:
                return 'bg-white/95 backdrop-blur-sm'
        }
    }

    return (
        <div className={`relative w-full flex flex-row justify-between p-8 z-20 ${getVariantStyles()} ${className}`}>
            <div>
                <Image alt="" src={Logo} width={100} height={100} />
            </div>
            <div>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="w-[150px] bg-transparent text-crexy-primary font-semibold hover:font-bold hover:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:hover:font-bold data-[state=open]:bg-transparent uppercase">
                                <Link href="/">Trang chủ</Link>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-linear-to-t from-cyan-200 to-violet-200">
                                <ul className="grid gap-2 w-[600px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <Image src={Logo} alt="Crexy Logo" />
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href={'/'}>
                                                <div className="text-xl text-crexy-secondary leading-none font-bold">crexy.me</div>
                                                <p className="line-clamp-2 text-crexy-primary text-sm leading-snug">
                                                    Cửa hành thời trang với những thiết kế đầy tính sáng tạo và cá tính tôn. Xem thêm...
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href={'/'}>
                                                <div className="text-md text-crexy-primary leading-none font-bold">Chính sách đổi trả</div>
                                                <p className="line-clamp-2 text-crexy-primary text-sm leading-snug">
                                                    Chính sách đổi trả sản phẩm được thiết kế để đảm bảo sự thoải mái và hài lòng. Chi tiết...
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href={'/'}>
                                                <div className="text-md text-crexy-primary leading-none font-bold">Chính sách giao hàng</div>
                                                <p className="line-clamp-2 text-crexy-primary text-sm leading-snug">
                                                    Chính sách giao hàng sản phẩm được thiết kế để đảm bảo sự thoải mái và hài lòng. Chi tiết...
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="w-[150px] bg-transparent text-crexy-primary font-semibold hover:font-bold hover:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:hover:font-bold data-[state=open]:bg-transparent uppercase">
                                <Link href="/products">Sản phẩm</Link>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-linear-to-t from-cyan-200 to-violet-200 left-[-120px]">
                                <div className="grid gap-2 w-[600px] md:grid-cols-2">
                                    <div>
                                        <Image className="h-[400px] w-[300px] object-cover" src={productCategoryImage} alt="Crexy Logo" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-crexy-primary text-xl font-bold pt-4 pl-4">Danh mục sản phầm</h3>
                                        <div className="flex flex-col flex-1 gap-2 pt-2 pl-4">
                                            <ProductCategoryMenuItem onMouseEnter={onHoverCuteClothes} title="Đồ bơi cute" href="/" />
                                            <ProductCategoryMenuItem onMouseEnter={onHoverSleepWear} title="Đồ ngủ" href="/" />
                                            <ProductCategoryMenuItem onMouseEnter={onHoverSwimWear} title="Đồ tí hon" href="/" />
                                        </div>
                                        <Button className="mt-4 font-bold" variant="primary" size="xl">Mua ngay</Button>
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="w-[150px] bg-transparent text-crexy-primary font-semibold hover:font-bold hover:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:hover:font-bold data-[state=open]:bg-transparent uppercase">Bộ sưu tập</NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-linear-to-t from-cyan-200 to-violet-200 left-[-200px]">
                                <div className="grid gap-2 w-[600px] md:grid-cols-2">
                                    <div>
                                        <Image className="h-[400px] w-[300px] object-cover" src={productCategoryImage} alt="Crexy Logo" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-crexy-primary text-xl font-bold pt-4 pl-4">Các bộ sưu tập hot nhất</h3>
                                        <div className="flex flex-col flex-1 gap-2 pt-2 pl-4">
                                            <ProductCategoryMenuItem onMouseEnter={onHoverCuteClothes} title="Bộ sưu tập đầu tiên" href="/" />
                                            <ProductCategoryMenuItem onMouseEnter={onHoverSleepWear} title="Bộ sưu tập mùa hè" href="/" />
                                            <ProductCategoryMenuItem onMouseEnter={onHoverSwimWear} title="Bộ sưu tập mùa hè thu" href="/" />
                                        </div>
                                        <Button className="mt-4 font-bold" variant="primary" size="xl">Xem thêm</Button>
                                    </div>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className="w-[80px] bg-transparent text-crexy-primary font-semibold hover:font-bold hover:bg-transparent uppercase">
                                <Link href="/blog">Blog</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/login" className="font-medium">
                                    <Search className="text-crexy-primary" style={{ width: "24px", height: "24px" }} />
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/login" className="font-medium">
                                    <UserRound className="text-crexy-primary" style={{ width: "24px", height: "24px" }} />
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className="bg-transparent">
                                <Link href="/register" className="text-sm font-medium">
                                    <ShoppingBag className="text-crexy-primary" style={{ width: "24px", height: "24px" }} />
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}


interface ProductCategoryMenuItemProps extends React.ComponentPropsWithoutRef<"div"> {
    title: string;
    href: string;
    onMouseEnter?: () => void;
}

const ProductCategoryMenuItem: React.FC<ProductCategoryMenuItemProps> = ({ title, href, onMouseEnter }) => {
    return (

        <div onMouseEnter={onMouseEnter} className="p-4 rounded-md text-crexy-primary cursor-pointer hover:text-crexy-secondary hover:underline">
            <motion.button whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 }
            }}>
                <Link href={href}>
                    {title}
                </Link>
            </motion.button>
        </div >
    )
}

export default TopBar;