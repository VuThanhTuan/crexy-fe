"use client"
import * as React from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCartStore } from "@/hooks/use-cart-store"
import { useModalStore } from "@/hooks/use-modal-store"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"



const HomeTopBar: React.FC = () => {
    const totalQuantity = useCartStore(s => s.totalQuantity());

    const { setOpenMiniCart } = useModalStore();

    return (
        <div className={`text-white bg-transparent fixed top-0 left-0 right-0 w-full max-w-full flex flex-col md:flex-row justify-center md:justify-between p-2 md:p-4 z-20`}>
            <Link href="/" className="text-2xl md:text-4xl lg:text-5xl font-bold text-shadow-[_0_0_18px_pink]">
                CREXY
            </Link>

            <div id="category-bar" className="flex flex-row items-center justify-between p-2 md:p-0 md:gap-3 lg:gap-4 text-sm md:text-md font-bold uppercase text-shadow-[_0_0_18px_pink]">
                <Link href="/products">
                    Sản phẩm
                </Link>
                <Link href="/collections">
                    Bộ sưu tập
                </Link>
                <Link href="/about-us">
                    Về chúng tôi
                </Link>
                <Link href="/about-us">
                    Social
                </Link>
            </div>


            <NavigationMenu viewport={false} className="hidden md:block">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="#" onClick={() => setOpenMiniCart(true)} className="font-medium relative">
                                <ShoppingBag className="text-white" style={{ width: "28px", height: "28px" }} />
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
    )
}



export default HomeTopBar;