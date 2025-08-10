import Ad1 from "@/public/images/Ad1.jpg"
import Ad2 from "@/public/images/Ad2.jpg"
import Logo from "@/public/images/CrexyLogo.png"
import Image from "next/image"
import { InfoBox } from "@/components/InfoBox"

export const HomeAdvertise: React.FC = () => {
    return (
        <div id="home-advertise" className="w-full h-[100vh] relative flex flex-row">
            <div id="home-advertise-left" className="w-[50%] h-full bg-crexy-primary p-8 relative" style={{
                backgroundImage: `url(${Ad1.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <Image src={Logo} alt="Logo" className="w-20 h-20 absolute top-10 left-10" />
                <p className="text-crexy-secondary text-5xl w-full text-center mt-[120px]">
                    Grand
                    <br />
                    Opening
                </p>
                <InfoBox title="New Collection" description="Our First Underware Collection" buttonText="Shop Now" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div id="home-advertise-right" className="w-[50%] h-full bg-crexy-primary p-8 relative" style={{
                backgroundImage: `url(${Ad2.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <p className="text-crexy-secondary text-5xl w-full text-center mt-[120px]">Finding  <br /> your style</p>
                <InfoBox title="" description="Explore all our collections" buttonText="Shop Now" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    )
}