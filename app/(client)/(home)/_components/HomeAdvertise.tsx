import Ad1 from "@/public/images/red-panda.jpeg"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export const HomeAdvertise: React.FC = () => {
    const router = useRouter();
    return (
        <div id="home-advertise" className="w-full h-[100vh] relative flex flex-row" style={{
            backgroundImage: `url(${Ad1.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <motion.p id="bst-name" className="uppercase text-[#ac1a19] font-extrabold text-5xl md:text-7xl lg:text-8xl max-w-[1000px] text-nowrap text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }} whileInView={{
                    opacity: 1,
                }} >
                Mùa hè rực rỡ
            </motion.p>
            <motion.p id="bst" className="uppercase font-extrabold text-white text-xl md:text-2xl lg:text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-12 md:-mt-18 lg:-mt-22 -ml-[10rem] md:-ml-[15rem] lg:-ml-[22rem]" initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 1, delay: 0.3, ease: [0, 0.71, 0.2, 1.01] }} whileInView={{
                    opacity: 1,
                    x: 0
                }}>BST</motion.p>
            <motion.p id="brand" className="uppercase font-extrabold text-white text-xl md:text-2xl lg:text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-12 md:-mt-18 lg:-mt-22 ml-[10rem] md:ml-[15rem] lg:ml-[22rem]" initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 1, delay: 0.3, ease: [0, 0.71, 0.2, 1.01] }} whileInView={{
                    opacity: 1,
                    x: 0
                }}>crexy</motion.p>
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-18 md:mt-24" initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 1, delay: 0.7, ease: [0, 0.71, 0.2, 1.01] }} whileInView={{
                    opacity: 1,
                    y: 0
                }}>
                <Button id="explore-collections" onClick={() => router.push('/collections')} className="font-bold uppercase" variant="primary" size="xl">Khám phá</Button>
            </motion.div>
        </div>
    )
}