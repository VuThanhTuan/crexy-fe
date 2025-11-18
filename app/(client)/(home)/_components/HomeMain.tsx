// import { HomeCarousel } from "./HomeCarousel"
import { HomeTopContent } from "./HomeTopContent"
import TopBar from "../../_components/top-bar"
// import Slide2 from "@/public/images/dreamina-1.png"
// import Image from "next/image"



export const HomeMain: React.FC = () => {
    return (
        <div id="home-top" className="relative flex flex-col font-sans w-full h-[100vh]">
            <div id="home-top-bg" className="absolute w-full h-full top-0 left-0 z-0">
                {/* <HomeCarousel /> */}
                <img src="/images/dreamina-1.png" alt="Background" className="object-fill h-[100vh] w-screen" />
            </div>
            <HomeTopContent />
            <TopBar variant="transparent" />
        </div>
    )
}