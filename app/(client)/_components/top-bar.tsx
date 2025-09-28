"use client"
import * as React from "react"
import Link from "next/link"
import { Search, ShoppingBag, UserRound } from "lucide-react"
import { useState } from "react"
import { useCartStore } from "@/hooks/use-cart-store"
import { useModalStore } from "@/hooks/use-modal-store"
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
import { motion } from "framer-motion"

interface TopBarProps {
    variant?: 'default' | 'transparent' | 'solid'
    className?: string
}

const   TopBar: React.FC<TopBarProps> = ({ variant = 'default', className = '' }) => {

    const [productCategoryImage, setProductCategoryImage] = useState<StaticImageData>(CuteClothes);
    const totalQuantity = useCartStore(s => s.totalQuantity());

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
                return 'text-white bg-transparent fixed! top-0 left-0 right-0'
            case 'solid':
                return 'fixed! top-0 left-0 right-0 text-crexy-primary'
            default:
                return 'bg-white/95 backdrop-blur-sm'
        }
    }

    const { setOpenMiniCart, setOpenLogin, setOpenSearch } = useModalStore()

    return (
        <div className={`w-full max-w-full flex flex-row justify-between p-4 z-20 ${getVariantStyles()} ${className}`}>
            <div>
                <Image alt="" src={Logo} width={100} height={100} />
            </div>
            <div>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link className="text-md hover:font-bold uppercase" href="/">Trang chủ</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="w-[150px] text-md font-md bg-transparent hover:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:bg-transparent">
                                <Link className="text-md font-md hover:font-bold uppercase" href="/products">Sản phẩm</Link>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-linear-to-t from-cyan-200 to-violet-200 left-[-120px] max-w-[90vw]">
                                <div className="grid gap-2 w-[600px] max-w-[90vw] md:grid-cols-2">
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
                            <Link className="text-md text-shadow hover:font-bold uppercase" href="/collections">Bộ sưu tập</Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="#"
                                    onClick={() => setOpenSearch(true)}
                                    className="font-medium cursor-pointer"
                                >
                                    <Search style={{ width: "24px", height: "24px" }} />
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="#" onClick={() => setOpenLogin(true)} className="font-medium">
                                    <UserRound style={{ width: "24px", height: "24px" }} />
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="#" onClick={() => setOpenMiniCart(true)} className="font-medium relative">
                                    <ShoppingBag style={{ width: "24px", height: "24px" }} />
                                    {totalQuantity > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                            {totalQuantity}
                                        </span>
                                    )}
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