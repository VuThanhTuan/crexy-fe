import TopBar from "../../_components/top-bar"
import { Button } from "@/components/ui/button"

export const HomeTopContent: React.FC = () => {
    return (
        <div id="home-top-content" className="w-full h-[100vh] relative">
            <div id="main-content" className="absolute z-10 w-full h-full top-0 left-0 flex flex-col items-center justify-center">
                <h1 className="text-4xl w-[400px] text-crexy-primary text-wrap text-center mb-4">We don’t make your more beatiful, we even make you become art. </h1>
                <Button className="mt-4 font-bold" variant="primary" size="xl">Shop Now</Button>
            </div>
            <TopBar />
        </div>
    )
}