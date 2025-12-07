import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";

export const HomeTopContent: React.FC = () => {
    const router = useRouter();
    return (
        <>
            <div id="home-top-content" className="w-full h-[100vh] relative">
                <div id="main-content" className="absolute z-10 w-full h-full top-0 left-0 flex flex-col items-center justify-center">
                    <motion.h1 className="uppercase text-sm md:text-xl lg:text-3xl w-[600px] text-white font-bold text-wrap text-center mb-4 text-shadow-[_0_0_18px_pink]" initial={{ opacity: 0, scale: 0.5 }}
                        transition={{
                            duration: 1,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}>
                        Sáng tạo phong cách riêng với bộ sưu tập mới nhất từ Crexy
                    </motion.h1>
                    <motion.div initial={{ scale: 0.5 }} transition={{ duration: 0.5 }} animate={{ scale: 1 }}>
                        <Button onClick={() => router.push('/products')} className="mt-1 uppercase font-bold md:hidden" variant="primary" size="lg">Mua ngay</Button>
                        <Button onClick={() => router.push('/products')} className="mt-2 uppercase font-bold hidden md:block lg:hidden" variant="primary" size="lg">Mua ngay</Button>
                    </motion.div>
                </div>
            </div>
        </>

    )
}