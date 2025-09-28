import Ad1 from "@/public/images/Ad1.jpg"
import Ad2 from "@/public/images/Ad2.jpg"
import Logo from "@/public/images/CrexyLogo.png"
import Image from "next/image"
import { InfoBox } from "@/components/InfoBox"
import { motion } from "framer-motion"

export const HomeAdvertise: React.FC = () => {
    return (
        <div id="home-advertise" className="w-full h-[100vh] relative flex flex-row">
            <div id="home-advertise-left" className="w-[50%] h-full bg-crexy-primary p-8 relative" style={{
                backgroundImage: `url(${Ad1.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <motion.p className="text-crexy-secondary text-5xl w-full text-center mt-[120px]" initial={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }} whileInView={{
                        opacity: 1,
                    }} >
                    Grand
                    <br />
                    Opening
                </motion.p>
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" initial={{ opacity: 0, scale: 0.5 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                    }} whileInView={{
                        opacity: 1,
                        scale: 1,
                    }} >
                    <InfoBox title="New Collection" description="Our First Underware Collection" buttonText="Shop Now" />
                </motion.div>

            </div>
            <div id="home-advertise-right" className="w-[50%] h-full bg-crexy-primary p-8 relative" style={{
                backgroundImage: `url(${Ad2.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <motion.p className="text-crexy-secondary text-5xl w-full text-center mt-[120px]" initial={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }} whileInView={{
                        opacity: 1,
                    }} >
                    Finding  <br /> your style
                </motion.p>
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" initial={{ opacity: 0, scale: 0.5 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.5,
                        ease: [0, 0.71, 0.2, 1.01],
                    }} whileInView={{
                        opacity: 1,
                        scale: 1,
                    }} >
                    <InfoBox title="" description="Explore all our collections" buttonText="Shop Now" />
                </motion.div>

            </div>
        </div>
    )
}