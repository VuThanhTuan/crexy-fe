"use client"
import * as React from "react"
import Link from "next/link"
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react"
import { useCartStore } from "@/hooks/use-cart-store"
import { useModalStore } from "@/hooks/use-modal-store"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"


interface TopBarProps {
    variant?: 'default' | 'transparent' | 'solid'
    className?: string
}

const   TopBar: React.FC<TopBarProps> = ({ variant = 'default', className = '' }) => {

    const pathname = usePathname();
    const isHomePage = pathname === "/"

    const totalQuantity = useCartStore(s => s.totalQuantity());

    const getVariantStyles = () => {
        switch (variant) {
            case 'transparent':
                return 'text-white bg-transparent fixed top-0 left-0 right-0'
            case 'solid':
                return 'fixed top-0 left-0 right-0 text-crexy-primary bg-white/95 backdrop-blur-sm'
            default:
                return 'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm'
        }
    }

    const { setOpenMiniCart, setOpenLogin, setOpenSearch, setOpenMenu } = useModalStore();

    const getIconColor = () => {
        return isHomePage ? 'text-white' : 'text-crexy-primary'
    }

    return (
        <div className={`w-full max-w-full flex flex-row justify-between p-4 z-20 ${getVariantStyles()} ${className}`}>
            <div className="flex flex-row items-center gap-2">
                <button onClick={() => setOpenMenu(true)} className="flex items-center gap-2">
                    <Menu className={`cursor-pointer ${getIconColor()}`} style={{ width: "36px", height: "36px" }} />
                    <span className="text-md font-bold">Menu</span>
                </button>
            </div>
            <div className="text-5xl font-bold text-shadow-3xs">
                CREXY
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
                                    <Search className={getIconColor()} style={{ width: "24px", height: "24px" }} />
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="#" onClick={() => setOpenLogin(true)} className="font-medium">
                                    <UserRound className={getIconColor()} style={{ width: "24px", height: "24px" }} />
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="#" onClick={() => setOpenMiniCart(true)} className="font-medium relative">
                                    <ShoppingBag className={getIconColor()} style={{ width: "24px", height: "24px" }} />
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



export default TopBar;