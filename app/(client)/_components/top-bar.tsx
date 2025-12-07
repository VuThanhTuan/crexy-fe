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
import { useAuth } from "../client-auth"


interface TopBarProps {
    variant?: 'default' | 'transparent' | 'solid'
    className?: string
}

const TopBar: React.FC<TopBarProps> = ({ variant = 'default', className = '' }) => {
    const [currentVariant, setCurrentVariant] = useState(variant);

    const totalQuantity = useCartStore(s => s.totalQuantity());

    const auth = useAuth();

    // Update currentVariant when variant prop changes
    useEffect(() => {
        setCurrentVariant(variant);
    }, [variant]);

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

    const { setOpenMiniCart, setOpenLogin, setOpenSearch, setOpenMenu, setOpenUserMenu } = useModalStore();

    const getIconColor = () => {
        return currentVariant === 'transparent' ? 'text-white' : 'text-crexy-primary'
    }

    const getLogoClassName = () => {
        const baseClassName = 'text-2xl md:text-4xl lg:text-5xl font-bold ';
        return currentVariant === 'transparent' ? `${baseClassName} text-shadow-[_0_0_18px_pink]` : `${baseClassName} bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent`
    }

    const handleUserIconClick = () => {
        // if user is authenticated, open user menu
        if (auth.isAuthenticated) {
            setOpenUserMenu(true);
            return;
        }
        // else open login modal
        setOpenLogin(true);
    }

    return (
        <div className={`w-full max-w-full flex flex-row justify-between p-4 z-20 ${getVariantStyles()} ${className}`}>
            <div className="flex flex-row items-center gap-1">
                <button onClick={() => setOpenMenu(true)} className="flex items-center gap-2">
                    <Menu className={`cursor-pointer ${getIconColor()} w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10`} />
                    <span className="hidden md:hidden lg:block lg:text-sm font-bold uppercase">Menu</span>
                </button>
                <Search onClick={() => setOpenSearch(true)} className={`${getIconColor()} md:hidden w-4 h-4 md:w-8 md:h-8 lg:w-6 lg:h-6`} />
            </div>
            <Link href="/" className={getLogoClassName()}>
                CREXY
            </Link>


            <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-1 md:gap-2 lg:gap-4">
                    <NavigationMenuItem>
                        <div className="hidden md:block">
                            <Search onClick={() => setOpenSearch(true)} className={`${getIconColor()} w-4 h-4 md:w-4 md:h-4 lg:w-6 lg:h-6`} />
                        </div>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <div>
                            <UserRound onClick={() => handleUserIconClick()} className={`${getIconColor()} w-4 h-4 md:w-4 md:h-4 lg:w-6 lg:h-6`} />
                        </div>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <div className="relative">
                            <ShoppingBag onClick={() => setOpenMiniCart(true)} className={`${getIconColor()} w-4 h-4 md:w-4 md:h-4 lg:w-6 lg:h-6`} />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                    {totalQuantity}
                                </span>
                            )}
                        </div>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}



export default TopBar;