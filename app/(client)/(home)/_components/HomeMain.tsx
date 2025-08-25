import { useParallax } from "@/hooks/use-parallax"
import { HomeCarousel } from "./HomeCarousel"
import { HomeTopContent } from "./HomeTopContent"



export const HomeMain: React.FC = () => {
    return (
        <div id="home-top" className="relative flex flex-col font-sans w-full h-[100vh]">
            <div id="home-top-bg" className="absolute w-full h-full top-0 left-0 z-0">
                <HomeCarousel />
            </div>
            <HomeTopContent />
        </div>
    )
}