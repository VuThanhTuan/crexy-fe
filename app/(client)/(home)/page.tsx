"use client"
import "@/css/embla.css";
import { HomeAdvertise } from "./_components/HomeAdvertise";
import { HomeProducts } from "./_components/HomeProducts";
import { HomeLibrary } from "./_components/HomeLibrary";
import { HomeMain } from "./_components/HomeMain";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Home, Search, UserRound } from "lucide-react";
import { useModalStore } from "@/hooks/use-modal-store";
import { useAuth } from "../client-auth";
import { useCartStore } from "@/hooks/use-cart-store";
import { ShoppingBag } from "lucide-react";

const TOTAL_SECTIONS = 4;
const SCROLL_DELAY = 1000; // ms
const SCROLL_THRESHOLD = 10; // pixels

const HomePage: React.FC = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const isScrollingRef = useRef(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const { setOpenLogin, setOpenSearch, setOpenUserMenu, setOpenMiniCart } = useModalStore();
    const auth = useAuth();
    const totalQuantity = useCartStore(s => s.totalQuantity());

    const scrollToSection = useCallback((direction: 'up' | 'down') => {
        if (isScrollingRef.current) return;

        isScrollingRef.current = true;

        setCurrentSection(prev => {
            const nextSection = direction === 'down'
                ? Math.min(prev + 1, TOTAL_SECTIONS - 1)
                : Math.max(prev - 1, 0);
            return nextSection;
        });

        setTimeout(() => {
            isScrollingRef.current = false;
        }, SCROLL_DELAY);
    }, []);

    const jumpToSection = useCallback((index: number) => {
        if (isScrollingRef.current) return;
        if (index < 0 || index >= TOTAL_SECTIONS) return;

        isScrollingRef.current = true;
        setCurrentSection(index);

        setTimeout(() => {
            isScrollingRef.current = false;
        }, SCROLL_DELAY);
    }, []);

    useEffect(() => {
        const handleWheel = (e: Event) => {
            // Only handle if currently on home page
            if (window.location.pathname !== '/') return;

            const wheelEvent = e as WheelEvent;
            e.preventDefault();
            e.stopPropagation();

            if (wheelEvent.deltaY > SCROLL_THRESHOLD) {
                scrollToSection('down');
            } else if (wheelEvent.deltaY < -SCROLL_THRESHOLD) {
                scrollToSection('up');
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle if currently on home page
            if (window.location.pathname !== '/') return;
            if (isScrollingRef.current) return;

            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    e.preventDefault();
                    scrollToSection('down');
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    scrollToSection('up');
                    break;
                case 'Home':
                    e.preventDefault();
                    jumpToSection(0);
                    break;
                case 'End':
                    e.preventDefault();
                    jumpToSection(TOTAL_SECTIONS - 1);
                    break;
            }
        };

        // Only attach listeners when initially on home page
        if (!isHomePage) return;

        // Attach to window but only when on home page
        window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [scrollToSection, jumpToSection, isHomePage]);

    const handleUserIconClick = () => {
        if (auth.isAuthenticated) {
            setOpenUserMenu(true);
            return;
        }
        setOpenLogin(true);
    };

    return (
        <div id="home-page-container" className="fixed inset-0 overflow-hidden">
            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50" aria-label="Bottom navigation">
                <div className="flex items-center gap-8 md:gap-12">
                    <button
                        onClick={() => jumpToSection(0)}
                        className="flex flex-col w-[50px] h-[50px] rounded-full backdrop-blur-sm items-center justify-center text-white hover:text-pink-500 transition-colors"
                        aria-label="Go to home section"
                    >
                        <Home size={24} className="text-white" />
                    </button>
                    <button
                        onClick={() => setOpenSearch(true)}
                        className="flex flex-col w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full backdrop-blur-sm items-center justify-center gap-1 text-white hover:text-pink-500 transition-colors"
                        aria-label="Search"
                    >
                        <Search size={24} className="text-white md:hidden" />
                        <Search size={32} className="text-white hidden md:block" />
                    </button>
                    <button
                        onClick={handleUserIconClick}
                        className="flex flex-col w-[50px] h-[50px] rounded-full backdrop-blur-sm items-center justify-center text-white hover:text-pink-500 transition-colors"
                        aria-label="User menu"
                    >
                        <UserRound size={24} className="text-white" />
                    </button>
                    <button
                        onClick={() => setOpenMiniCart(true)}
                        className="md:hidden flex flex-col w-[50px] h-[50px] rounded-full backdrop-blur-sm items-center justify-center text-white hover:text-pink-500 transition-colors relative"
                        aria-label="Shopping cart"
                    >
                        <ShoppingBag size={24} className="text-white" />
                        {totalQuantity > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                {totalQuantity}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Section Navigation Indicators */}
            <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3" aria-label="Section navigation">
                {Array.from({ length: TOTAL_SECTIONS }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => jumpToSection(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSection === index
                                ? 'bg-white scale-125'
                                : 'bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Go to section ${index + 1}`}
                        aria-current={currentSection === index ? 'true' : 'false'}
                    />
                ))}
            </nav>

            {/* Sections Container */}
            <div
                className="relative h-full w-full transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateY(-${currentSection * 100}vh)`
                }}
            >
                <section className="h-screen w-full">
                    <HomeMain />
                </section>
                <section className="h-screen w-full">
                    <HomeProducts />
                </section>
                <section className="h-screen w-full">
                    <HomeAdvertise />
                </section>
                <section className="h-screen w-full">
                    <HomeLibrary />
                </section>
            </div>
        </div>
    );
}

export default HomePage;