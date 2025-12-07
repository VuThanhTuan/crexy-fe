"use client"
import { Footer } from "./_components/footer";
import TopBar from "./_components/top-bar";
import { usePathname } from "next/navigation";
import { MiniCart } from "@/components/MiniCart";
import { AuthModal } from "@/components/AuthModal";
import { SearchModal } from "@/components/SearchModal";
import { MenuModal } from "@/components/MenuModal";
import { useModalStore } from "@/hooks/use-modal-store";
import { AuthProvider } from "./client-auth";
import { UserMenu } from "@/components/UserMenu";
import { useMemo } from "react";
import HomeTopBar from "./_components/home-top-bar";


const ClientRootLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isHomePageMemo = useMemo(() => pathname === "/", [pathname]);
    const { openMiniCart, openLogin, openSearch, openMenu, openUserMenu, setOpenMiniCart, setOpenLogin, setOpenSearch, setOpenMenu, setOpenUserMenu } = useModalStore();
    return (
        <AuthProvider>
            <div className="w-full min-h-screen overflow-x-hidden">
                {/* TopBar with transparent variant only on homepage */}
                {isHomePageMemo ? <HomeTopBar /> : <TopBar />}
                <div className="w-full h-auto relative">
                    {children}
                </div>
                {/* Only show footer on non-home pages */}
                {!isHomePageMemo && <Footer />}

                {/* Modals - positioned at the root level */}
                <MiniCart open={openMiniCart} onClose={() => setOpenMiniCart(false)} />
                <AuthModal open={openLogin} onClose={() => setOpenLogin(false)} />
                <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
                <MenuModal open={openMenu} onClose={() => setOpenMenu(false)} />
                <UserMenu open={openUserMenu} onClose={() => setOpenUserMenu(false)} />
            </div>
        </AuthProvider>
    );
}

export default ClientRootLayout;