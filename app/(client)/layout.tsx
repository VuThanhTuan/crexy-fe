"use client"
import { Footer } from "./_components/footer";
import TopBar from "./_components/top-bar";
import { usePathname } from "next/navigation";
import { MiniCart } from "@/components/MiniCart";
import { AuthModal } from "@/components/AuthModal";
import { SearchModal } from "@/components/SearchModal";
import { useModalStore } from "@/hooks/use-modal-store";


const ClientRootLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const { openMiniCart, openLogin, openSearch, setOpenMiniCart, setOpenLogin, setOpenSearch } = useModalStore();

    return (
        <div className="w-full min-h-screen overflow-x-hidden">
            {!isHomePage && <TopBar />}
            <div className="w-full h-auto relative">
                {children}
            </div>
            <Footer />
            
            {/* Modals - positioned at the root level */}
            <MiniCart open={openMiniCart} onClose={() => setOpenMiniCart(false)} />
            <AuthModal open={openLogin} onClose={() => setOpenLogin(false)} />
            <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
        </div>
    );
}

export default ClientRootLayout;