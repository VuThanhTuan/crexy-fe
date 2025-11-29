"use client"
import "@/css/embla.css";
import { HomeAdvertise } from "./_components/HomeAdvertise";
import { HomeProducts } from "./_components/HomeProducts";
import { HomeLibrary } from "./_components/HomeLibrary";
import { Footer } from "../_components/footer";
import { ScrollSection } from "@/components/ScrollSection";
import { HomeMain } from "./_components/HomeMain";
import { useEffect, useRef } from "react";
import TopBar from "../_components/top-bar";

const HomePage: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let isScrolling = false;
        const sections = container.querySelectorAll('.snap-section');
        let currentSectionIndex = 0;

        const scrollToSection = (index: number) => {
            if (isScrolling || index < 0 || index >= sections.length) return;

            isScrolling = true;
            const targetSection = sections[index] as HTMLElement;
            const targetTop = targetSection.offsetTop;

            // Custom smooth scroll with longer duration
            const startTop = container.scrollTop;
            const distance = targetTop - startTop;
            const duration = 1200; // 2 seconds - you can adjust this value
            const startTime = performance.now();

            const animateScroll = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth motion
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);

                container.scrollTop = startTop + (distance * easeOutCubic);

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    isScrolling = false;
                    currentSectionIndex = index;
                }
            };

            requestAnimationFrame(animateScroll);
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            if (isScrolling) return;

            if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
                // Scroll down to next section
                scrollToSection(currentSectionIndex + 1);
            } else if (e.deltaY < 0 && currentSectionIndex > 0) {
                // Scroll up to previous section
                scrollToSection(currentSectionIndex - 1);
            }
        };

        // Handle keyboard navigation
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isScrolling) return;

            if (e.key === 'ArrowDown' && currentSectionIndex < sections.length - 1) {
                e.preventDefault();
                scrollToSection(currentSectionIndex + 1);
            } else if (e.key === 'ArrowUp' && currentSectionIndex > 0) {
                e.preventDefault();
                scrollToSection(currentSectionIndex - 1);
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {/* <ScrollSection className="h-screen flex items-center justify-center">
                <HomeMain />
            </ScrollSection> */}
            <HomeMain />
            {/* <ScrollSection className="h-screen flex items-center justify-center">
                <HomeAdvertise />
            </ScrollSection> */}
            <HomeProducts />
            <HomeAdvertise />
            {/* <ScrollSection className="h-screen flex items-center justify-center">
                <HomeProducts />
            </ScrollSection> */}

            {/* <ScrollSection className="h-screen flex items-center justify-center">
                <HomeLibrary />
            </ScrollSection> */}
            <HomeLibrary />
        </>
    );
}

export default HomePage;