
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"
export const HomeProducts: React.FC = () => {

    const router = useRouter();
    return (
        <div id="home-products" className="w-full h-[100vh] relative flex flex-col relative">
            <video src="/images/dreamina-video.mp4" autoPlay loop muted className="w-full h-full object-cover" />
            {/* <Button variant="primary" className="uppercase absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 z-12" size="xl" onClick={() => router.push('/products')}>
                View All
            </Button> */}

            <motion.p id="bst-name" className="uppercase text-[#566b54] font-extrabold text-6xl max-w-[1000px] text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }} whileInView={{
                    opacity: 1,
                }} >
                Sống xanh cùng Crexy
            </motion.p>
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-24" initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 1, delay: 0.7, ease: [0, 0.71, 0.2, 1.01] }} whileInView={{
                    opacity: 1,
                    y: 0
                }}>
                <Button id="explore-collections" onClick={() => router.push('/products')} className="font-bold uppercase" variant="primary" size="xl">Mua ngay</Button>
            </motion.div>

        </div>
    )
}