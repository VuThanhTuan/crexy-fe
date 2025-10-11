
import { Button } from "@/components/ui/button"
import Bg3 from "@/public/images/Bg3.jpg"
import { Product, ProductBox } from "@/components/ProductBox";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
} from "@/components/ui/carousel"
import Pro1 from "@/public/images/Produc1-2.jpg"
import Pro2 from "@/public/images/Product1.jpg"
import Pro3 from "@/public/images/Product2.jpg"
import Pro4 from "@/public/images/Product3.jpg"
import Pro5 from "@/public/images/List5.jpg"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import Bg from "@/public/images/Bg5.jpg";
import { HomeBox } from "../../_components/home-box";
import { motion } from "framer-motion";
import Slide2 from "@/public/images/dreamina-studio.jpeg"


export const HomeLibrary: React.FC = () => {
    return (
        <div id="home-library" className="w-full h-[100vh] relative flex flex-col">
            <div id="home-library-photos" className="w-full h-[50%] bg-linear-to-r from-cyan-300 to-pink-300">
                <Carousel className="w-full h-full" opts={{ loop: true }} plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}>
                    <CarouselContent className="w-full h-[50vh] m-0 p-0">
                        <CarouselItem className="basis-1/5 p-0 w-full bg-yellow-300"
                            style={{ backgroundImage: `url(${Pro1.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        </CarouselItem>
                        <CarouselItem className="basis-1/5 p-0!" style={{ backgroundImage: `url(${Pro2.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        </CarouselItem>
                        <CarouselItem className="basis-1/5 p-0!" style={{ backgroundImage: `url(${Pro3.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        </CarouselItem>
                        <CarouselItem className="basis-1/5 p-0!" style={{ backgroundImage: `url(${Pro4.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        </CarouselItem>
                        <CarouselItem className="basis-1/5 p-0!" style={{ backgroundImage: `url(${Pro5.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
            <div id="home-library-information" className="w-full h-[50%] flex justify-center items-center"
                style={{ backgroundImage: `url(${Slide2.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                    }} whileInView={{
                        opacity: 1,
                        scale: 1,
                    }} >
                    <HomeBox />
                </motion.div>

            </div>
        </div>
    )
}