"use client"
import "@/css/embla.css";
import { HomeAdvertise } from "./_components/HomeAdvertise";
import { HomeProducts } from "./_components/HomeProducts";
import { HomeLibrary } from "./_components/HomeLibrary";
import { Footer } from "../_components/footer";
import { ScrollSection } from "@/components/ScrollSection";
import { HomeMain } from "./_components/HomeMain";

const HomePage: React.FC = () => {

    return (
        <div className="h-screen overflow-y-scroll smooth-scroll">
            <ScrollSection className="h-screen flex items-center justify-center">
                <HomeMain />    
            </ScrollSection>
            <ScrollSection className="h-screen flex items-center justify-center">
                <HomeAdvertise />
            </ScrollSection>
            <ScrollSection className="h-screen flex items-center justify-center">
                <HomeProducts />
            </ScrollSection>
            <ScrollSection className="h-screen flex items-center justify-center">
                <HomeLibrary />
            </ScrollSection>
            <ScrollSection className="flex items-center justify-center">
                <Footer />
            </ScrollSection>
        </div>
    );
}

export default HomePage;