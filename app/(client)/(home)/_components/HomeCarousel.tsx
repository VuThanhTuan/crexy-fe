import {
    Carousel,
    CarouselContent,
    CarouselItem,
    // CarouselNext,
    // CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade";
import Slide1 from "@/public/images/Slide2.jpg"
import Slide2 from "@/public/images/Slide4.jpg"
import Slide3 from "@/public/images/Slide5.jpg"
import Image from "next/image"

export const HomeCarousel: React.FC = () => {
    return (
        <div className="w-full h-full opacity-90">
            <Carousel className="w-full h-full" opts={{ loop: true, }} plugins={[
                Autoplay({
                    delay: 3000,
                }),
                Fade(),
            ]}>
                <CarouselContent>
                    <CarouselItem>
                        <Image src={Slide2} alt="Background" className="object-fill h-[100vh] w-screen" />
                    </CarouselItem>
                    <CarouselItem>
                        <Image src={Slide3} alt="Background" className="object-fill h-[100vh] w-screen" />
                    </CarouselItem>
                    <CarouselItem>
                        <Image src={Slide1} alt="Background" className="object-fill h-[100vh] w-screen" />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    )
}