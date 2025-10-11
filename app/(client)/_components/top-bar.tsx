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
import { useEffect, useState } from "react"


interface TopBarProps {
    variant?: 'default' | 'transparent' | 'solid'
    className?: string
}

const TopBar: React.FC<TopBarProps> = ({ variant = 'default', className = '' }) => {
    const [currentVariant, setCurrentVariant] = useState(variant);
    
    const totalQuantity = useCartStore(s => s.totalQuantity());

    const getVariantStyles = () => {
        switch (currentVariant) {
            case 'transparent':
                return 'text-white bg-transparent fixed top-0 left-0 right-0'

            default:
                return 'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm'
        }
    }

    useEffect(() => {
        // Chỉ áp dụng logic scroll khi variant ban đầu là 'transparent'
        if (variant !== 'transparent') {
            return;
        }

        const handleScroll = () => {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
            
            if (scrollTop > 0) {
                // Khi scroll xuống, đổi sang 'default'
                setCurrentVariant('default');
            } else {
                // Khi ở top hoặc không scroll, quay lại 'transparent'
                setCurrentVariant('transparent');
            }
        }

        document.body.addEventListener('scroll', handleScroll);
        return () => document.body.removeEventListener('scroll', handleScroll);
    }, [variant]);

    const { setOpenMiniCart, setOpenLogin, setOpenSearch, setOpenMenu } = useModalStore();

    const getIconColor = () => {
        return currentVariant === 'transparent' ? 'text-white' : 'text-crexy-primary'
    }

    const getLogoClassName = () => {
        const baseClassName = 'text-5xl font-bold text-shadow-3xs'
        return currentVariant === 'transparent' ? baseClassName : `${baseClassName} bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent`
    }

    return (
        <div className={`w-full max-w-full flex flex-row justify-between p-4 z-20 ${getVariantStyles()} ${className}`}>
            <div className="flex flex-row items-center gap-2">
                <button onClick={() => setOpenMenu(true)} className="flex items-center gap-2">
                    <Menu className={`cursor-pointer ${getIconColor()}`} style={{ width: "36px", height: "36px" }} />
                    <span className="text-md font-bold uppercase">Menu</span>
                </button>
            </div>
            <Link href="/" className={getLogoClassName()}>
                CREXY
            </Link>

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