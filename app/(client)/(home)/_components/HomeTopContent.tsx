import TopBar from "../../_components/top-bar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export const HomeTopContent: React.FC = () => {
    return (
        <>
            <div id="home-top-content" className="w-full h-[100vh] relative">
                <div id="main-content" className="absolute z-10 w-full h-full top-0 left-0 flex flex-col items-center justify-center">
                    <motion.h1 className="uppercase text-3xl w-[600px] text-white text-wrap text-center mb-4" initial={{ opacity: 0, scale: 0.5 }}
                        transition={{
                            duration: 1,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}>
                        Khoác lên bạn sự sáng tạo và quyến rũ, tự tin và năng động.
                    </motion.h1>
                    <motion.div initial={{ scale: 0.5 }} transition={{ duration: 0.5 }} animate={{ scale: 1 }}>
                        <Button className="mt-4 font-bold uppercase" variant="primary" size="xl">Mua ngay</Button>
                    </motion.div>
                </div>
            </div>
        </>

    )
}