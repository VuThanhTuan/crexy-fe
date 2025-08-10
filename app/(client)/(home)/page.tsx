"use client"
import "@/css/embla.css";
import Logo from "@/public/images/CrexyLogo.png"
import BG from "@/public/images/Bg1 (1).jpg"
import BG2 from "@/public/images/Bg4.jpg"
import BG3 from "@/public/images/Bg3.jpg"
import TopBar from "../_components/top-bar";
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { HomeCarousel } from "./_components/HomeCarousel"
import { Button } from "@/components/ui/button";
import { HomeTopContent } from "./_components/HomeTopContent";
import { HomeAdvertise } from "./_components/HomeAdvertise";
import { HomeProducts } from "./_components/HomeProducts";
import { HomeLibrary } from "./_components/HomeLibrary";
import { Footer } from "../_components/footer";


const HomePage: React.FC = () => {
    const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay({ delay: 300 })]);
    return (
        <div className="flex flex-col">
            <div id="home-top" className="relative flex flex-col font-sans w-full h-[100vh]">
                <div id="home-top-bg" className="absolute w-full h-full top-0 left-0 z-0" ref={emblaRef}>
                    <HomeCarousel />
                </div>
                <HomeTopContent />
            </div>
            <HomeAdvertise />
            <HomeProducts />
            <HomeLibrary />
            <Footer />
        </div>

    );
}

export default HomePage;